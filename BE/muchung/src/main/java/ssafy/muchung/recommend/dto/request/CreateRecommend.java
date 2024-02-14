package ssafy.muchung.recommend.dto.request;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
public class CreateRecommend {
	private List<String> title;
	private List<String> reason;
}
