package ssafy.muchung.mail.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import springfox.documentation.annotations.ApiIgnore;
import ssafy.muchung.mail.dto.MailDto;
import ssafy.muchung.mail.dto.request.CreateMail;
import ssafy.muchung.mail.dto.response.SimpleMail;
import ssafy.muchung.mail.service.MailService;
import ssafy.muchung.member.entity.Member;
import ssafy.muchung.member.service.MemberService;
import ssafy.muchung.notification.service.NotificationService;
import ssafy.muchung.notification.type.NotificationType;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/mails")
public class MailController {

	private final MailService mailService;
	private final NotificationService notificationService;
	private final MemberService memberService;


	@ApiOperation(value = "메일 작성", notes = "메일 작성")
	@PostMapping()
	public ResponseEntity<?> createMail(
		@ApiIgnore @AuthenticationPrincipal Member member,
		@RequestBody CreateMail createMail
	) {
		Long mailId = mailService.createMail(member.getId(), createMail);

		notificationService.send(createMail.getReceiverId(), member.getName(), NotificationType.MAIL, member.getName()+ "님으로부터 메일이 왔습니다.", mailId, LocalDateTime.now());

		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@ApiOperation(value = "수신 메일 전체 조회", notes = "받은 메일 조회")
	@GetMapping("/received")
	public ResponseEntity<?> getReceivedMailList(
		@ApiIgnore @AuthenticationPrincipal Member member,
		@RequestParam(name = "isRead", required = false) Boolean isRead
	) {
		return ResponseEntity.ok(mailService.getReceivedMailList(member.getId(), isRead));
	}

	@ApiOperation(value = "발신 메일 전체 조회", notes = "보낸 메일 조회")
	@GetMapping("/sent")
	public ResponseEntity<?> getSentMailList(
		@ApiIgnore @AuthenticationPrincipal Member member
	) {
		return ResponseEntity.ok(mailService.getSentMailList(member.getId()));
	}

	@ApiOperation(value = "메일 상세 조회", notes = "id 기반 메일 상세 조회")
	@GetMapping("/{mailId}")
	public ResponseEntity<?> getMail(
		@PathVariable(name = "mailId") Long mailId
	) {
		MailDto mail = mailService.getMail(mailId);
		return ResponseEntity.ok(mail);
	}

	// @ApiOperation(value = "메일 삭제", notes = "id 기반 메일 삭제 (진짜 DB에서 삭제)")
	// @DeleteMapping("")
	@ApiOperation(value = "메일 삭제", notes = "id 기반 메일 삭제 (DB에서 진짜 삭제 되는 건 아님)")
	@PatchMapping("/delete/{mailIds}")
	public ResponseEntity<?> deleteMails(
		@PathVariable(name = "mailIds") List<Long> mailIds
	) {
		mailService.deleteMails(mailIds);
		return ResponseEntity.ok().build();
	}

	@ApiOperation(value = "삭제된 메일 전체 조회", notes = "[휴지통] 삭제된 메일 전체 조회")
	@GetMapping("/delete")
	public ResponseEntity<?> getDeletedMailList(
		@ApiIgnore @AuthenticationPrincipal Member member
	) {
		return ResponseEntity.ok(mailService.getDeletedMailList(member.getId()));
	}

	@ApiOperation(value = "메일 즐겨찾기 설정", notes = "id 기반 메일 즐겨찾기 설정")
	@PatchMapping("/interest/{mailId}")
	public ResponseEntity<?> setMailInterest(
		@PathVariable(name = "mailId") Long mailId,
		@RequestParam(name = "interest") Boolean interest
	) {
		mailService.updateMailInterest(mailId, interest);
		return ResponseEntity.ok().build();
	}

	@ApiOperation(value = "즐겨찾기 메일 전체 조회", notes = "수신/발신 메일 통틀어 즐겨찾기 메일 전체 조회")
	@GetMapping("/interest")
	public ResponseEntity<?> getInterestMailList(
		@ApiIgnore @AuthenticationPrincipal Member member
	) {
		return ResponseEntity.ok(mailService.getInterestMailList(member.getId()));
	}
}
