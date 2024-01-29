package ssafy.muchung.hello.exception;

import ssafy.muchung.global.exception.BaseException;

public class HelloException extends BaseException {

    public HelloException(ErrorCode errorCode) {
        super(errorCode.getHttpStatus(), errorCode.getMessage());
    }
}
