package ssafy.muchung.hello.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import ssafy.muchung.hello.dto.HelloDto;
import ssafy.muchung.hello.dto.request.CreateHello;
import ssafy.muchung.hello.service.HelloService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/hello")
public class HelloController {

	private final HelloService helloService;

	@GetMapping()
	public String hello() {
		return "이게 보인다면 서버는 살아있다 우하하!";
	}

	@GetMapping("/{helloId}")
	public ResponseEntity<HelloDto> getHello(@PathVariable final Long helloId) {
		return ResponseEntity.ok(helloService.getHello(helloId));
	}

	@PostMapping()
	public ResponseEntity<HelloDto> makeHello(@RequestBody CreateHello createHello) {
		return ResponseEntity.status(HttpStatus.CREATED)
			.body(helloService.createHello(createHello));
	}

}
