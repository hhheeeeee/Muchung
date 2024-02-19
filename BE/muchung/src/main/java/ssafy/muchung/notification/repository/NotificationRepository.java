package ssafy.muchung.notification.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ssafy.muchung.notification.entity.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
	public List<Notification> findTop5ByReceiverIdAndIsReadOrderByCreatedAtDesc(Long id, boolean isRead);

	public Optional<Notification> findById(Long id);
}
