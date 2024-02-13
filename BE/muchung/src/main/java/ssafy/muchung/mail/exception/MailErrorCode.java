package ssafy.muchung.mail.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MailErrorCode {
	NOT_FOUND_MAIL(HttpStatus.BAD_REQUEST, "유효하지 않은 메일 ID 입니다.");
	private final HttpStatus httpStatus;
	private final String message;
}
