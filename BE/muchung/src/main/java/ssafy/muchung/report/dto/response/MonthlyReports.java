package ssafy.muchung.report.dto.response;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import ssafy.muchung.report.entity.Report;

@ToString
@Builder
@Getter
public class MonthlyReports {
	private Long reportId;
	private LocalDate date;
	private int count = 1;

	public static MonthlyReports fromEntity(Report report) {
		return MonthlyReports.builder()
			.reportId(report.getId())
			.date(report.getReportDate())
			.count(1)
			.build();
	}
}
