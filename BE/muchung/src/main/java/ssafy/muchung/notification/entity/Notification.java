package ssafy.muchung.notification.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ssafy.muchung.global.entity.BaseTimeEntity;
import ssafy.muchung.member.entity.Member;
import ssafy.muchung.notification.type.NotificationType;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Notification extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id")
    private Member receiver;

    @Column
    private String sender;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column
    @Enumerated(EnumType.STRING)
    private NotificationType notificationType;

    @Column
    private Long targetId;

    @Column
    private boolean isRead;

    @Column
    private LocalDateTime receivedDate;

}
