package ssafy.muchung.mail.dto.request;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ssafy.muchung.mail.entity.Mail;

@Getter
@Setter
@ToString
@Builder
public class CreateMail {
	private String title;
	private String content;
	private String receiverEmail;
}
