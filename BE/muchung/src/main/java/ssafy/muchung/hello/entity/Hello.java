package ssafy.muchung.hello.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.muchung.global.entity.BaseTimeEntity;

/*
    Entity에 Setter는 지양하자 - 불변객체 지향

    속성은 reference type으로 - 초기화 값은 문제를 유발

    All Argument constructor 는 지양하자

    @builder 는 생성자 함수에 달자

    무분별한 객체 생성 지양 -> 생성자 접근제한자 설정
* */

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Hello extends BaseTimeEntity {

	@Id
	@Column(nullable = false)
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String message;

	@Builder
	public Hello(Long id, String message) {
		this.id = id;
		this.message = message;
	}
}
