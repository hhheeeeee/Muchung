package ssafy.muchung.mail.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ssafy.muchung.mail.dto.request.CreateMail;
import ssafy.muchung.mail.dto.MailDto;
import ssafy.muchung.mail.dto.response.SimpleMail;
import ssafy.muchung.mail.entity.Mail;
import ssafy.muchung.mail.exception.MailErrorCode;
import ssafy.muchung.mail.exception.MailException;
import ssafy.muchung.mail.repository.MailRepository;
import ssafy.muchung.member.entity.Member;
import ssafy.muchung.member.repository.MemberRepository;
import ssafy.muchung.task.exception.ErrorCode;

@Service
@Slf4j
@RequiredArgsConstructor
public class MailService {

	private final MailRepository mailRepository;
	private final MemberRepository memberRepository;

	// 메일 작성
	public Long createMail(long senderId, CreateMail createMail) {
		Member sender = memberRepository.findById(senderId)
			.orElseThrow(() -> new RuntimeException("멤버 없음"));
		Member receiver = memberRepository.findById(createMail.getReceiverId())
			.orElseThrow(() -> new RuntimeException("멤버 없음"));

		return mailRepository.save(Mail.builder()
			.sender(sender)
			.receiver(receiver)
			.title(createMail.getTitle())
			.content(createMail.getContent())
			.sentTime(LocalDateTime.now())
			.isRead(Boolean.TRUE) // TODO: sender == receiver?
			.interest(Boolean.FALSE)
			.isDeleted(Boolean.FALSE)
			.build()
		).getId();
	}

	// 수신한 메일 전체 조회
	public List<SimpleMail> getReceivedMailList(long receiverId, Boolean isRead) {
		Member receiver = memberRepository.findById(receiverId)
			.orElseThrow(() -> new RuntimeException("멤버 없음"));

		if (isRead == null) { // 받은 메일 전체 조회 (읽음 여부 상관 X)
			return mailRepository.findByReceiverAndIsDeleted(receiver, Boolean.FALSE)
				.stream()
				.map(SimpleMail::fromEntity)
				.collect(Collectors.toList());
		} else { // 받은 메일 중 읽은/안읽은 메일 조회
			return mailRepository.findByReceiverAndIsReadAndIsDeleted(receiver, isRead, Boolean.FALSE)
				.stream()
				.map(SimpleMail::fromEntity)
				.collect(Collectors.toList());
		}
	}

	// 발신한 메일 전체 조회
	public List<SimpleMail> getSentMailList(long senderId) {
		Member sender = memberRepository.findById(senderId)
			.orElseThrow(() -> new RuntimeException("멤버 없음"));

		return mailRepository.findBySenderAndIsDeleted(sender, Boolean.FALSE)
			.stream()
			.map(SimpleMail::fromEntity)
			.collect(Collectors.toList());
	}

	// 즐겨찾기한 메일 전체 조회
	public List<SimpleMail> getInterestMailList(long userId) {
		Member user = memberRepository.findById(userId)
			.orElseThrow(() -> new RuntimeException("멤버 없음"));

		return mailRepository.findByInterestAndReceiverAndIsDeletedOrInterestAndSenderAndIsDeleted(
				Boolean.TRUE, user, Boolean.FALSE, Boolean.TRUE, user, Boolean.FALSE
				)
			.stream()
			.map(SimpleMail::fromEntity)
			.collect(Collectors.toList());
	}

	// 삭제된 메일 전체 조회 (휴지통)
	public List<SimpleMail> getDeletedMailList(long userId) {
		Member user = memberRepository.findById(userId)
			.orElseThrow(() -> new RuntimeException("멤버 없음"));

		return mailRepository.findByIsDeleted(Boolean.TRUE)
			.stream()
			.map(SimpleMail::fromEntity)
			.collect(Collectors.toList());
	}

	// 메일 하나 상세 조회
	@Transactional
	public MailDto getMail(long mailId) {
		Mail mail = findByMailId(mailId);
		mail.updateReadStatus();
		return MailDto.fromEntity(mail);
	}

	@Transactional
	public void deleteMails(List<Long> mailIds) {
		for (Long mailId : mailIds) {
			Mail mail = findByMailId(mailId);
			mail.updateDeletedStatus();
			// mailRepository.delete(mail);
		}
	}

	@Transactional
	public void updateMailInterest(Long mailId, Boolean interest) {
		Mail mail = findByMailId(mailId);
		mail.updateInterestStatus(interest);
	}

	private Mail findByMailId(Long mailId) {
		return mailRepository.findById(mailId)
			.orElseThrow(() -> new MailException(MailErrorCode.NOT_FOUND_MAIL));
	}
}
