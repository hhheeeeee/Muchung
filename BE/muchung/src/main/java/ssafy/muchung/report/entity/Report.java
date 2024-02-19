package ssafy.muchung.report.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Comment;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.muchung.global.entity.BaseTimeEntity;
import ssafy.muchung.member.entity.Member;
import ssafy.muchung.task.entity.Task;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Entity
public class Report extends BaseTimeEntity {

	@Id
	@Column(nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	@JoinColumn(name = "report_id")
	@OneToMany(fetch = FetchType.LAZY)
	private List<Task> tasks = new ArrayList<>();

	@Comment("썸네일 이미지, 첫 완료 업무")
	private String thumbnail;

	@Column(nullable = false)
	private LocalDate reportDate;

	// 댓글 List

	private String review;

	@Builder
	public Report(Member member, List<Task> tasks, String thumbnail, LocalDate reportDate, String review) {
		this.member = member;
		this.tasks = tasks;
		this.thumbnail = thumbnail;
		this.reportDate = reportDate;
		this.review = review;
	}

	public void updateReview(String review) {
		this.review = review;
	}
}
