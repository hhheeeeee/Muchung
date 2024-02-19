package ssafy.muchung.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ssafy.muchung.email.dto.response.GetEmailInformation;
import ssafy.muchung.email.service.EmailService;
import ssafy.muchung.member.dto.request.SaveMemberInformation;
import ssafy.muchung.member.dto.request.UpdateMemberInformation;
import ssafy.muchung.member.dto.response.GetMemberInformation;
import ssafy.muchung.member.entity.Member;
import ssafy.muchung.member.service.MemberService;

@RestController
@Slf4j
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;
	private final EmailService emailService;

	@ApiOperation(value = "회원가입 전형 진행 상태 조회", notes = "소셜 로그인 한 사용자가 어느 단계까지 회원가입을 진행했는지 상태를 조회한다.")
	@GetMapping("/status")
	public ResponseEntity<?> getStatus(@AuthenticationPrincipal Member member) {
		log.info("Member ID: {}", member.getId());
		log.info("Member Status: {}", member.getStatus());

		return ResponseEntity.ok(member.getStatus());
	}

	@ApiOperation(value = "이메일 조회", notes = "소셜 로그인으로 회원가입 한 이메일을 조회한다.")
	@GetMapping("/email")
	public ResponseEntity<?> getEmail(@AuthenticationPrincipal Member member) {
		log.info("Member ID: {}", member.getId());
		log.info("Member Email: {}", member.getEmail());

		return ResponseEntity.ok(member.getEmail());
	}

	@ApiOperation(value = "개인정보 저장", notes = "회원가입 단계 중 개인정보를 입력받아 저장한다.")
	@PatchMapping("")
	public ResponseEntity<?> saveMemberInformation(@AuthenticationPrincipal Member member,
		@RequestBody SaveMemberInformation saveMemberInformation) {
		log.info("Member ID: {}", member.getId());

		memberService.saveMemberInformation(member.getId(), saveMemberInformation);
		return ResponseEntity.status(HttpStatus.OK).build();
	}

	@ApiOperation(value = "전형 단계 INTERVIEW로 변경", notes = "회원가입 단계를 INTERVIEW로 변경한다.")
	@PatchMapping("/interview")
	public ResponseEntity<?> updateMemberStatusToInterview(@AuthenticationPrincipal Member member) {
		log.info("Member ID: {}", member.getId());

		memberService.updateMemberStatusToInterview(member.getId());
		return ResponseEntity.status(HttpStatus.OK).build();
	}

	@ApiOperation(value = "부서 배치 및 전형 단계 NCS로 변경", notes = "회원가입을 마치고 단계를 NCS로 변경한다.")
	@PatchMapping("/department/{departmentId}")
	public ResponseEntity<?> updateDepartment(@AuthenticationPrincipal Member member,
		@PathVariable Long departmentId) {
		log.info("Member ID: {}", member.getId());

		GetEmailInformation information = memberService.updateMemberDepartment(member.getId(), departmentId);

		try{
			log.info(information.getName() + " " + information.getEmail() + " " + information.getDepartmentName());
			emailService.sendEmailMessage(information);
		} catch (Exception e) {
			log.info(e.getMessage());
			return ResponseEntity.badRequest().build();
		}

		return ResponseEntity.status(HttpStatus.OK).build();
	}

	@ApiOperation(value = "회원 개인 정보 조회", notes = "회원의 개인 정보를 조회한다.")
	@GetMapping("/memberInfo")
	public ResponseEntity<?> getMemberInformation(@AuthenticationPrincipal Member member) {
		log.info("Member ID: {}", member.getId());

		GetMemberInformation information = memberService.getMemberInformation(member.getId());
		return ResponseEntity.ok(information);
	}

	@ApiOperation(value = "회원 개인 정보 수정", notes = "회원의 전화번호, 프로필 사진, 소개글을 수정한다.")
	@PatchMapping("/memberInfo")
	public ResponseEntity<?> updateMemberInformation(@AuthenticationPrincipal Member member,
		@RequestBody UpdateMemberInformation updateMemberInformation) {
		log.info("Member ID: {}", member.getId());

		memberService.updateMemberInformation(member.getId(), updateMemberInformation);

		return ResponseEntity.status(HttpStatus.OK).build();
	}

	@ApiOperation(value = "회원 탈퇴", notes = "회원이 서비스에서 탈퇴한다.")
	@DeleteMapping("/withdraw")
	public ResponseEntity<?> deleteMember(@AuthenticationPrincipal Member member) {
		log.info("Member ID: {}", member.getId());

		memberService.deleteMember(member.getId());

		return ResponseEntity.status(HttpStatus.OK).build();
	}

	@ApiOperation(value = "멤버 이메일 검색 자동완성", notes = "멤버 이메일로 자동완성 검색 기능을 제공.")
	@GetMapping("/autocomplete")
	public ResponseEntity<?> search(String keyword) {
		return ResponseEntity.ok(memberService.autocomplete(keyword));
	}

}
