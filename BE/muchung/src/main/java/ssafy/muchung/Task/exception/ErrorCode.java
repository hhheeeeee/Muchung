package ssafy.muchung.task.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

	NOT_FOUND_TASK(HttpStatus.BAD_REQUEST, "유효하지 않은 id 입니다.");

	private final HttpStatus httpStatus;
	private final String message;
}
