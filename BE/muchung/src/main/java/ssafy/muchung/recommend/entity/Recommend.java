package ssafy.muchung.recommend.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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
public class Recommend extends BaseTimeEntity {

	@Id
	@Column(nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	@Comment("추천 업무명")
	@Column(nullable = false)
	private String title;

	@Comment("추천 이유")
	@Column(nullable = false)
	private String reason;

	@Comment("추천 기반 날짜(어제 날짜)")
	@Column(nullable = false)
	private LocalDate baseTime;

	@Builder
	public Recommend(Member member, String title, String reason, LocalDate baseTime) {
		this.member = member;
		this.title = title;
		this.reason = reason;
		this.baseTime = baseTime;
	}
}
