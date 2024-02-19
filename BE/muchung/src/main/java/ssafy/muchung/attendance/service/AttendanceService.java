package ssafy.muchung.attendance.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ssafy.muchung.attendance.dto.response.GetAttendanceInformation;
import ssafy.muchung.attendance.entity.Attendance;
import ssafy.muchung.attendance.repository.AttendanceRepository;
import ssafy.muchung.member.entity.Member;
import ssafy.muchung.member.repository.MemberRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class AttendanceService {
	private final AttendanceRepository attendanceRepository;
	private final MemberRepository memberRepository;

	public void checkIn(Long id, LocalDateTime startTime) {
		Member member = memberRepository.findById(id).orElseThrow();

		Attendance attendance = Attendance.builder()
			.member(member)
			.startTime(startTime)
			.build();

		attendanceRepository.save(attendance);
	}

	@Transactional
	public void checkOut(Long id, LocalDateTime endTime) {
		LocalDateTime startDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(0, 0, 0));
		LocalDateTime endDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(23, 59, 59));

		Attendance attendance = attendanceRepository.findByMemberIdAndStartTimeBetween(id, startDatetime, endDatetime)
			.orElseThrow();
		attendance.setEndTime(endTime);
	}

	public GetAttendanceInformation getAttendanceInformation(Long id) {
		LocalDateTime startDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(0, 0, 0));
		LocalDateTime endDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(23, 59, 59));

		Attendance attendance = attendanceRepository.findByMemberIdAndStartTimeBetween(id, startDatetime, endDatetime)
			.orElse(null);

		if (attendance == null)
			return null;

		return GetAttendanceInformation.builder()
			.startTime(attendance.getStartTime())
			.endTime(attendance.getEndTime())
			.build();
	}
}
