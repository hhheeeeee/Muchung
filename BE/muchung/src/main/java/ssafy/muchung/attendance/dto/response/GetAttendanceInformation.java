package ssafy.muchung.attendance.dto.response;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Builder
public class GetAttendanceInformation {
	private LocalDateTime startTime;
	private LocalDateTime endTime;
}
