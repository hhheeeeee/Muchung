package ssafy.muchung.report.dto.response;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import ssafy.muchung.report.entity.Report;
import ssafy.muchung.task.dto.TaskDto;

@ToString
@Builder
@Getter
public class MyReportDetail {
	private LocalDate reportDate;
	private List<TaskDto> tasks;
	private String review;

	public static MyReportDetail fromEntity(Report report) {
		return MyReportDetail.builder()
				.reportDate(report.getReportDate())
				.tasks(report.getTasks()
						.stream()
						.map(TaskDto::fromEntity)
						.collect(Collectors.toList()))
				.review(report.getReview())
				.build();
	}

}
