package ssafy.muchung.mail.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Comment;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.muchung.global.entity.BaseTimeEntity;
import ssafy.muchung.member.entity.Member;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Entity
public class Mail extends BaseTimeEntity {
	@Id
	@Column(nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Comment("발신자")
	@ManyToOne()
	@JoinColumn(nullable = false)
	private Member sender;

	@Comment("수신자")
	@ManyToOne()
	@JoinColumn(nullable = false)
	private Member receiver;

	@Comment("제목")
	@Column(nullable = false)
	private String title;

	@Comment("내용")
	@Column(nullable = false)
	@Lob // blob?
	private String content;

	@Comment("발신 시간")
	@Column(nullable = false)
	private LocalDateTime sentTime;

	@Comment("열람 여부")
	@Column(nullable = false)
	private Boolean isRead;

	@Comment("관심")
	@Column(nullable = false)
	private Boolean interest;

	@Comment("삭제 여부")
	@Column(nullable = false)
	private Boolean isDeleted;

	@Builder
	public Mail(
		Member sender,
		Member receiver,
		String title,
		String content,
		LocalDateTime sentTime,
		Boolean isRead,
		Boolean interest,
		Boolean isDeleted
	) {
		this.sender = sender;
		this.receiver = receiver;
		this.title = title;
		this.content = content;
		this.sentTime = sentTime;
		this.isRead = isRead;
		this.interest = interest;
		this.isDeleted = isDeleted;
	}

	// 메일 삭제 처리 (실제 DB에서 삭제되는 게 아니라 isDeleted를 true로 바꾸기만)
	public void updateDeletedStatus() {
		this.isDeleted = Boolean.TRUE;
	}

	// 메일 관심 설정/해제
	public void updateInterestStatus(Boolean interest) {
		this.interest = interest;
	}

	// 메일 읽음 처리
	public void updateReadStatus() {
		this.isRead = Boolean.TRUE;
	}
}
