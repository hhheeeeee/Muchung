package ssafy.muchung.recommend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;
import ssafy.muchung.member.entity.Member;
import ssafy.muchung.recommend.dto.request.CreateRecommend;
import ssafy.muchung.recommend.service.RecommendService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/recommend")
public class RecommendController {

	private final RecommendService recommendService;

	@ApiOperation(value = "추천 업무 저장", notes = "채팅 종료 후 ChatGPT가 추천한 업무(3개)를 DB에 저장")
	@PostMapping()
	public ResponseEntity<?> createRecommend(
		@ApiIgnore @AuthenticationPrincipal Member member,
		@RequestBody CreateRecommend createRecommend
	) {
		recommendService.createRecommend(member.getId(), createRecommend);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@ApiOperation(value = "추천 업무 조회", notes = "전날 채팅을 기준으로 ChatGPT가 추천한 업무(3개)를 조회, 없다면 랜덤으로 추천해줍니다.")
	@GetMapping()
	public ResponseEntity<?> getRecommendationList(
		@ApiIgnore @AuthenticationPrincipal Member member
	) {
		final long RECOMMEND_SIZE = 3;

		return ResponseEntity.ok(
			recommendService.getEveryRecommendation(member.getId(), RECOMMEND_SIZE)
		);
	}
}
