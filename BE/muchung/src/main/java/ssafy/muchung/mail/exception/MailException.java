package ssafy.muchung.mail.exception;

import ssafy.muchung.global.exception.BaseException;
import ssafy.muchung.task.exception.ErrorCode;

public class MailException extends BaseException {
	public MailException(MailErrorCode mailErrorCode) {
		super(mailErrorCode.getHttpStatus(), mailErrorCode.name(), mailErrorCode.getMessage());
	}
}
