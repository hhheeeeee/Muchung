package ssafy.muchung.member.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ssafy.muchung.member.dto.MemberDto;
import ssafy.muchung.member.entity.Member;

/*
수신(발신)된 메일 상세 조회 시 수신자(발신자)에 대한 정보
 */

@Getter
@Setter
@ToString
@Builder
public class MailMember {
	private String name;
	private String email;
	// private Long departmentId;
	private String departmentName;
	private String profileImage;

	public static MailMember fromEntity(Member member) {
		return MailMember.builder()
			.name(member.getName())
			.email(member.getEmail())
			.departmentName(member.getDepartment().getName())
			.profileImage(member.getProfileImage())
			.build();
	}
}
