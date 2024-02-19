package ssafy.muchung.report.dto.response;

import java.time.LocalDate;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ssafy.muchung.comment.dto.CommentDto;
import ssafy.muchung.member.dto.MemberDto;
import ssafy.muchung.task.dto.TaskDto;

@Getter
@Setter
@ToString
public class ReportsFeed {

	private Long id;
	// 사람
	// 프사 이름 부서
	private MemberDto member;

	// 업무 대표 이미지
	//	private String thumbnail;

	// 리뷰
	private String review;

	// 보고서 올린 날짜
	private LocalDate reportDate;

	// 좋아요 개수
	private long likeCount;

	// 좋아요 눌렀는지 여부
	private long myLike;

	// 업무
	private List<TaskDto> tasks;

	// 댓글
	private List<CommentDto> comments;

	public ReportsFeed(Long id, Long memberId, String name, String profileImage, String department, String review, LocalDate reportDate,
		long likeCount, long myLike) {
		this.id = id;
		this.member = MemberDto.builder()
				.id(memberId)
				.name(name)
				.image(profileImage)
				.department(department)
				.build();
		this.review = review;
		this.reportDate = reportDate;
		this.likeCount = likeCount;
		this.myLike = myLike;
	}

}
