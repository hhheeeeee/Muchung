package ssafy.muchung.global.exception;

import static ssafy.muchung.global.exception.type.ExceptionCode.*;

import java.util.Objects;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(
		final MethodArgumentNotValidException e) {
		final String errorMessage = Objects.requireNonNull(e.getBindingResult().getFieldError()).getDefaultMessage();

		return ResponseEntity.badRequest()
			.body(new ErrorResponse(INVALID_FIELD_REQUEST.name(), errorMessage));
	}

	@ExceptionHandler(BaseException.class)
	public ResponseEntity<ErrorResponse> handleRuntimeException(BaseException exception) {
		return ResponseEntity.status(exception.getHttpStatus())
			.body(ErrorResponse.from(exception));
	}
}
