package ssafy.muchung.hello.dto;


import lombok.Builder;
import lombok.Getter;
import ssafy.muchung.hello.entity.Hello;

@Getter
@Builder
public class HelloDto {
    private Long id;
    private String message;

    public static HelloDto fromEntity(Hello hello) {
        return HelloDto.builder()
                .id(hello.getId())
                .message(hello.getMessage())
                .build();
    }
}
