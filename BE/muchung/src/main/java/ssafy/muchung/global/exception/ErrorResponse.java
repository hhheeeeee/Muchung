package ssafy.muchung.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorResponse {
	private final String errorCode;
	private final String message;

	public static ErrorResponse from(final BaseException baseException) {
		return new ErrorResponse(baseException.getErrorCode(), baseException.getMessage());
	}

}
