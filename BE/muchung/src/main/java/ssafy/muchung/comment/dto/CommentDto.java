package ssafy.muchung.comment.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.muchung.comment.entity.Comment;
import ssafy.muchung.member.dto.MemberDto;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
	private Long id;

	private MemberDto member;

	private String content;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime createdAt;

	public static CommentDto fromEntity(Comment comment) {
		return CommentDto.builder()
			.id(comment.getId())
			.content(comment.getContent())
			.member(MemberDto.fromEntity(comment.getMember()))
			.createdAt(comment.getCreatedAt())
			.build();
	}

}
