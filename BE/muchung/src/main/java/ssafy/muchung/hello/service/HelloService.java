package ssafy.muchung.hello.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.muchung.hello.dto.request.CreateHello;
import ssafy.muchung.hello.dto.HelloDto;
import ssafy.muchung.hello.entity.Hello;
import ssafy.muchung.hello.exception.ErrorCode;
import ssafy.muchung.hello.exception.HelloException;
import ssafy.muchung.hello.repository.HelloRepository;

@Service
@RequiredArgsConstructor
public class HelloService {
    private final HelloRepository helloRepository;

    public HelloDto getHello(Long helloId) {
        return HelloDto.fromEntity(helloRepository.findById(helloId)
                .orElseThrow(() -> new HelloException(ErrorCode.NOT_FOUND_HELLO)));
    }

    public HelloDto createHello(CreateHello createHello) {
        return HelloDto
                .fromEntity(helloRepository
                        .save(Hello
                                .builder()
                                .message(createHello
                                        .getMessage())
                                .build()));
    }
}
