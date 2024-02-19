package ssafy.muchung.report.dto.response;

import java.time.LocalDate;
import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ssafy.muchung.comment.dto.CommentDto;
import ssafy.muchung.comment.entity.Comment;
import ssafy.muchung.member.dto.MemberDto;
import ssafy.muchung.task.dto.TaskDto;

@ToString
@Getter
@Setter
public class ReportDetail {
	private MemberDto member;
	private LocalDate reportDate;
	private String review;

	private List<TaskDto> tasks;
	private List<CommentDto> comments;

	private long likeCount;
	private long myLike;

	public ReportDetail(Long memberId, String name, String profileImage, LocalDate reportDate, String review,
		long likeCount, long myLike) {
		this.member = MemberDto.builder()
			.id(memberId)
			.name(name)
			.image(profileImage)
			.build();
		this.reportDate = reportDate;
		this.review = review;
		this.likeCount = likeCount;
		this.myLike = myLike;
	}
}
