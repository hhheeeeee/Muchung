package ssafy.muchung.report.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PagingCondition {
	/*  반환 size - 필수
	 * */
	private Integer limit;

	/*  페이지 번호 - option - default 0
	 * */
	private int page;
}
