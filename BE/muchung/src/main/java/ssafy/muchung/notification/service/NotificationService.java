package ssafy.muchung.notification.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import ssafy.muchung.member.entity.Member;
import ssafy.muchung.member.repository.MemberRepository;
import ssafy.muchung.notification.dto.response.NotificationDto;
import ssafy.muchung.notification.entity.Notification;
import ssafy.muchung.notification.repository.EmitterRepository;
import ssafy.muchung.notification.repository.NotificationRepository;
import ssafy.muchung.notification.type.NotificationType;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    private final NotificationRepository notificationRepository;
    private final EmitterRepository emitterRepository;
    private final MemberRepository memberRepository;

    public SseEmitter subscribe(Long id, String lastEventId, HttpServletResponse response) {
        String emitterId = makeNewId(id);
        SseEmitter sseEmitter = emitterRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));
        response.setHeader("X-Accel-Buffering", "no");

        sseEmitter.onCompletion(() -> emitterRepository.deleteById(emitterId));
        sseEmitter.onTimeout(() -> emitterRepository.deleteById(emitterId));

        String eventId = makeNewId(id);
        sendNotification(sseEmitter, eventId, emitterId, "연결 완료");

        if(hasLostData(lastEventId))
            sendLostData(lastEventId, id, sseEmitter, emitterId);

        return sseEmitter;
    }

    private String makeNewId(Long id){
        return id + "_" + System.currentTimeMillis();
    }

    private void sendNotification(SseEmitter sseEmitter, String emitterId, String eventId, Object data){
        try{
            sseEmitter.send(SseEmitter.event().id(eventId).name("sse").data(data));
        }catch(IOException exception){
            emitterRepository.deleteById(emitterId);
        }
    }

    private boolean hasLostData(String lastEventId){
        return !lastEventId.isEmpty();
    }

    private void sendLostData(String lastEventId, Long id, SseEmitter sseEmitter, String emitterId){
        Map<String, Object> eventCaches = emitterRepository.findAllEventCachesByMemberId(id.toString());
        eventCaches.entrySet().stream()
                .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                .forEach(entry -> sendNotification(sseEmitter, emitterId, entry.getKey(), entry.getValue()));
    }

    public void send(Long receiverId, String sender, NotificationType notificationType, String content, Long targetId, LocalDateTime receivedDate){
        Member receiver = memberRepository.findById(receiverId).orElseThrow();

        Notification notification = notificationRepository.save(
                Notification.builder().receiver(receiver)
                .sender(sender)
                .notificationType(notificationType)
                .content(content)
                .targetId(targetId)
                .isRead(false)
                .receivedDate(receivedDate)
                .build());

        String eventId = makeNewId(receiver.getId());

        Map<String, SseEmitter> emitters = emitterRepository.findAllEmittersByMemberId(receiver.getId().toString());

        emitters.forEach(
                (key, emitter) -> {
                    emitterRepository.saveEventCache(key, notification);

                    sendNotification(emitter, key, eventId, NotificationDto.fromEntity(notification));
                }
        );
    }

    public List<NotificationDto> getNotifications(Long id) {
        List<Notification> notificationList = notificationRepository.findTop5ByReceiverIdAndIsReadOrderByCreatedAtDesc(id, false);
        List<NotificationDto> notificationDtoList = new ArrayList<>();
        notificationList.forEach(notification -> notificationDtoList.add(NotificationDto.fromEntity(notification)));

        return notificationDtoList;
    }

    @Transactional
    public void readNotification(Long id){
        Notification notification = notificationRepository.findById(id).orElseThrow();
        notification.setRead(true);
    }
}
