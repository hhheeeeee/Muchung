package ssafy.muchung.mail.dto.response;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ssafy.muchung.mail.dto.MailDto;
import ssafy.muchung.mail.entity.Mail;
import ssafy.muchung.member.dto.response.MailMember;
import ssafy.muchung.member.entity.Member;

@Getter
@Setter
@ToString
@Builder
public class SimpleMail {
	private Long id;
	private String title;
	private LocalDateTime sentTime;
	private Boolean isRead;
	private String senderName;
	private String receiverName;
	private Boolean interest;

	public static SimpleMail fromEntity(Mail mail) {
		return SimpleMail.builder()
			.id(mail.getId())
			.title(mail.getTitle())
			.sentTime(mail.getSentTime())
			.isRead(mail.getIsRead())
			.senderName(mail.getSender().getName())
			.receiverName(mail.getReceiver().getName())
			.interest(mail.getInterest())
			.build();
	}
}
