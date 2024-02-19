package ssafy.muchung.recommend.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import ssafy.muchung.member.entity.Member;

import java.time.LocalDate;

@Getter
@Builder
@ToString
public class RecommendDto {
    private Long id;
    private String title;
    private String reason;
    private LocalDate baseTime;

    public static RecommendDto fromEntity(Recommend recommend) {
        return RecommendDto.builder()
            .id(recommend.getId())
            .title(recommend.getTitle())
            .reason(recommend.getReason())
            .baseTime(recommend.getBaseTime())
            .build();
    }
}
