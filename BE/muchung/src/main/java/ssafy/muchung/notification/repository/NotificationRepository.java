package ssafy.muchung.notification.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ssafy.muchung.notification.entity.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
