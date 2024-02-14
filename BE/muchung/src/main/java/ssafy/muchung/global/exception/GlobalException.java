package ssafy.muchung.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import ssafy.muchung.global.exception.type.ExceptionCode;

@Getter
public class GlobalException extends BaseException{
    public GlobalException(ExceptionCode exceptionCode) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, exceptionCode.name(), exceptionCode.getMessage());
    }
}
