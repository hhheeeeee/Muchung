package ssafy.muchung.mail.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ssafy.muchung.mail.entity.Mail;
import ssafy.muchung.member.entity.Member;

@Repository
public interface MailRepository extends JpaRepository<Mail, Long> {

	List<Mail> findByReceiverAndIsDeleted(Member receiver, Boolean isDeleted);

	List<Mail> findBySenderAndIsDeleted(Member sender, Boolean isDeleted);

	List<Mail> findByReceiverAndIsReadAndIsDeleted(Member receiver, Boolean isRead, Boolean isDeleted);

	List<Mail> findByIsDeleted(Boolean isDeleted);

	List<Mail> findByInterestAndReceiverAndIsDeletedOrInterestAndSenderAndIsDeleted(
		Boolean interest1, Member receiver, Boolean isDeleted1,
		Boolean interest2, Member sender, Boolean isDeleted2
	);
}
