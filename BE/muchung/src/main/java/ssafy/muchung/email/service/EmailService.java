package ssafy.muchung.email.service;

import javax.mail.Message;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import lombok.RequiredArgsConstructor;
import ssafy.muchung.email.dto.response.GetEmailInformation;

@Service
@RequiredArgsConstructor
public class EmailService {
	private final JavaMailSender javaMailSender;
	private final SpringTemplateEngine springTemplateEngine;

	public void sendEmailMessage(GetEmailInformation information) throws Exception{
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();

		mimeMessage.addRecipients(Message.RecipientType.TO, information.getEmail());
		mimeMessage.setSubject("무청컴퍼니 지원 결과 알려드립니다.");
		mimeMessage.setText(setContext(information), "utf-8", "html");

		javaMailSender.send(mimeMessage);
	}

	private String setContext(GetEmailInformation information){
		Context context = new Context();
		context.setVariable("information", information);
		return springTemplateEngine.process("email", context);
	}
}
