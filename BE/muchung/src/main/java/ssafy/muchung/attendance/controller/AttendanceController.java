package ssafy.muchung.attendance.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ssafy.muchung.attendance.dto.request.CheckIn;
import ssafy.muchung.attendance.dto.request.CheckOut;
import ssafy.muchung.attendance.dto.response.GetAttendanceInformation;
import ssafy.muchung.attendance.service.AttendanceService;
import ssafy.muchung.member.entity.Member;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/attendance")
public class AttendanceController {
	private final AttendanceService attendanceService;

	@ApiOperation(value = "출근", notes = "회원의 출근 시간을 저장한다.")
	@PostMapping("/checkIn")
	public ResponseEntity<?> checkIn(@AuthenticationPrincipal Member member, @RequestBody CheckIn checkIn) {
		log.info("Member ID: {}", member.getId());

		attendanceService.checkIn(member.getId(), checkIn.getStartTime());

		return ResponseEntity.status(HttpStatus.OK).build();
	}

	@ApiOperation(value = "퇴근", notes = "회원의 퇴근 시간을 저장한다.")
	@PatchMapping("/checkOut")
	public ResponseEntity<?> checkOut(@AuthenticationPrincipal Member member, @RequestBody CheckOut checkOut) {
		log.info("Member ID: {}", member.getId());

		attendanceService.checkOut(member.getId(), checkOut.getEndTime());

		return ResponseEntity.status(HttpStatus.OK).build();
	}

	@ApiOperation(value = "당일 근태 정보 조회", notes = "회원의 근태 정보를 조회한다.")
	@GetMapping("/attendanceInfo")
	public ResponseEntity<?> getAttendanceInformation(@AuthenticationPrincipal Member member) {
		log.info("Member ID: {}", member.getId());

		GetAttendanceInformation information = attendanceService.getAttendanceInformation(member.getId());

		return ResponseEntity.ok(information);
	}
}
