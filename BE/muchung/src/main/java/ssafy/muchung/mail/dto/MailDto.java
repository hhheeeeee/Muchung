package ssafy.muchung.mail.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import ssafy.muchung.mail.entity.Mail;
import ssafy.muchung.member.dto.response.MailMember;
import ssafy.muchung.member.entity.Member;

@Getter
@Builder
@ToString
public class MailDto {
	private Long id;
	private MailMember sender;
	private MailMember receiver;
	private String title;
	private String content;
	private LocalDateTime sentTime;
	private Boolean isRead;
	private Boolean interest;
	private Boolean isDeleted;

	public static MailDto fromEntity(Mail mail) {
		return MailDto.builder()
			.id(mail.getId())
			.sender(MailMember.fromEntity(mail.getSender()))
			.receiver(MailMember.fromEntity(mail.getReceiver()))
			.title(mail.getTitle())
			.content(mail.getContent())
			.sentTime(mail.getSentTime())
			.isRead(mail.getIsRead())
			.interest(mail.getInterest())
			.isDeleted(mail.getIsDeleted())
			.build();
	}
}
