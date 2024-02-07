package ssafy.muchung.attendance.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ssafy.muchung.attendance.entity.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
	Optional<Attendance> findByMemberIdAndStartTimeBetween(Long id, LocalDateTime startTime, LocalDateTime endTime);
}
