package ssafy.muchung.notification.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.muchung.notification.entity.Notification;
import ssafy.muchung.notification.type.NotificationType;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class NotificationDto {
    private Long id;
    private NotificationType notificationType;
    private Long targetId;
    private String sender;
    private String content;
    private boolean isRead;
    private LocalDateTime receivedDate;

    public static NotificationDto fromEntity(Notification notification){
        return NotificationDto.builder()
                .id(notification.getId())
                .notificationType(notification.getNotificationType())
                .targetId(notification.getTargetId())
                .sender(notification.getSender())
                .content(notification.getContent())
                .isRead(notification.isRead())
                .receivedDate(notification.getReceivedDate())
                .build();
    }
}
