package ssafy.muchung.task.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Comment;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.muchung.global.entity.BaseTimeEntity;
import ssafy.muchung.member.entity.Member;
import ssafy.muchung.report.entity.Report;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Table(indexes = {@Index(name = "taskDate_index", columnList = "taskDate")})
@Entity
public class Task extends BaseTimeEntity {
	@Id
	@Column(nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	@Comment("업무 명")
	@Column(nullable = false)
	private String title;

	@Comment("업무 올린 날짜")
	@Column(nullable = false)
	private LocalDate taskDate;

	@Comment("업무 완료 처리된 날짜")
	private LocalDateTime completedTime;

	@Comment("업무 완료 여부")
	@Column(nullable = false)
	private Boolean isCompleted;

	@Comment("업무 완료 이미지")
	private String completionImage;

	@ManyToOne
	@JoinColumn(name = "report_id")
	private Report report;

	@Builder
	public Task(Member member, String title, LocalDate taskDate, LocalDateTime completedTime, Boolean isCompleted,
		String completionImage) {

		this.member = member;
		this.title = title;
		this.taskDate = taskDate;
		this.completedTime = completedTime;
		this.isCompleted = isCompleted;
		this.completionImage = completionImage;
	}

	public void completeTask(String image) {
		this.completionImage = image;
		this.isCompleted = Boolean.TRUE;
		this.completedTime = LocalDateTime.now();
	}
}
