package ssafy.muchung.member.dto;

import lombok.Builder;
import lombok.Getter;
import ssafy.muchung.member.entity.Member;

@Getter
@Builder
public class MemberDto {
	private Long id;
	private String name;
	private String image;

	public static MemberDto fromEntity(Member member) {
		return MemberDto.builder()
			.id(member.getId())
			.name(member.getName())
			.image(member.getProfileImage())
			.build();
	}
}
