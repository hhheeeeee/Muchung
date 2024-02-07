package ssafy.muchung.email.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class GetEmailInformation {
	private String name;
	private String email;
	private String departmentName;
}
