package ssafy.muchung.notification.controller;

import java.util.List;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import ssafy.muchung.member.entity.Member;
import ssafy.muchung.notification.dto.response.NotificationDto;
import ssafy.muchung.notification.service.NotificationService;

import javax.print.attribute.standard.Media;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notification")
public class NotificationController {
    private final NotificationService notificationService;

    @ApiOperation(value = "SSE 연결", notes = "알림을 구독해서 클라이언트와 연결한다.")
    @GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@AuthenticationPrincipal Member member, @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId, HttpServletResponse response){
        return notificationService.subscribe(member.getId(), lastEventId, response);
    }

    @ApiOperation(value="알림 조회", notes="최근 받은 알림 중 읽지 않은 알림 5개를 조회한다.")
    @GetMapping("")
    public ResponseEntity<?> getNotifications(@AuthenticationPrincipal Member member){
        List<NotificationDto> notifications = notificationService.getNotifications(member.getId());
        return ResponseEntity.ok(notifications);
    }

    @ApiOperation(value="알림 읽음 처리", notes="알림 읽음 표시를 한다.")
    @PatchMapping("/read/{notificationId}")
    public ResponseEntity<?> readNotification(@PathVariable Long notificationId){
        notificationService.readNotification(notificationId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
