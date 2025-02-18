package ssafy.muchung.member.dto;

import lombok.Builder;
import lombok.Getter;
import ssafy.muchung.member.entity.Member;

import java.util.Objects;

@Getter
@Builder
public class MemberDto {
	private Long id;
	private String name;
	private String image;
	private String email;
	private String department;

	public static MemberDto fromEntity(Member member) {
		return MemberDto.builder()
				.id(member.getId())
				.name(member.getName())
				.image(member.getProfileImage())
				.email(member.getEmail())
				.department(Objects.isNull(member.getDepartment()) ? "무소속" : member.getDepartment().getName())
				.build();
	}

}
