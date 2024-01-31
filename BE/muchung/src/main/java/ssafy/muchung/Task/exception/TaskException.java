package ssafy.muchung.task.exception;

import ssafy.muchung.global.exception.BaseException;

public class TaskException extends BaseException {
	public TaskException(ErrorCode errorCode) {
		super(errorCode.getHttpStatus(), errorCode.name(), errorCode.getMessage());
	}
}
