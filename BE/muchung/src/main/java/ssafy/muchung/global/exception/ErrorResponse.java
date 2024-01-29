package ssafy.muchung.global.exception;

import lombok.Getter;

@Getter
public class ErrorResponse {
    private final BaseException exception;

    public ErrorResponse(BaseException exception) {
        this.exception = exception;
    }
}
