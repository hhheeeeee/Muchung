package ssafy.muchung.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class GetMemberInformation {
	private String name;
	private String profileImage;
	private Long departmentId;
	private String departmentName;
	private int nDays;
}
