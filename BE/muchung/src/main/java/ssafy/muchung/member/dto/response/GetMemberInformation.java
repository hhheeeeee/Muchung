package ssafy.muchung.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class GetMemberInformation {
	private Long id;
	private String name;
	private String profileImage;
	private String departmentName;
	private String email;
	private String phone;
	private String description;
	private int nDays;
}
