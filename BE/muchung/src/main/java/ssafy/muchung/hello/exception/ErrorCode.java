package ssafy.muchung.hello.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;


@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    NOT_FOUND_HELLO(HttpStatus.BAD_REQUEST, "유효하지 않은 id입니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
