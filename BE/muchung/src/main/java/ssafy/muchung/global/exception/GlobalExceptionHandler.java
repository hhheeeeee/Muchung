package ssafy.muchung.global.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BaseException.class)
    public ErrorResponse handleRuntimeException(BaseException exception) {
        return new ErrorResponse(exception);
    }
}
