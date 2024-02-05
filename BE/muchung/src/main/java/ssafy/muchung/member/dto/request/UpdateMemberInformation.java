package ssafy.muchung.member.dto.request;

import lombok.Getter;

@Getter
public class UpdateMemberInformation {
	private String name;
	private String description;
	private String phone;
	private String profileImage;
}
