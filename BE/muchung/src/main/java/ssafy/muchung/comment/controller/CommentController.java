package ssafy.muchung.comment.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import ssafy.muchung.comment.dto.CommentDto;
import ssafy.muchung.comment.dto.request.RequestComment;
import ssafy.muchung.comment.service.CommentService;
import ssafy.muchung.member.entity.Member;

@RestController
@RequiredArgsConstructor
public class CommentController {
	private final CommentService commentService;

	@ApiOperation(value = "댓글 생성 api", notes = "댓글을 생성하고 생성된 댓글을 반환합니다.")
	@PostMapping("/reports/{reportId}/comments")
	public ResponseEntity<CommentDto> createComment(@AuthenticationPrincipal Member member, @PathVariable Long reportId, @RequestBody RequestComment requestComment) {
		return ResponseEntity.ok(commentService.createComment(reportId, member, requestComment.getContent()));
	}

	@ApiOperation(value = "댓글 삭제 api", notes = "댓글을 삭제합니다.")
	@DeleteMapping("/comments/{commentId}")
	public ResponseEntity<?> deleteComment(@AuthenticationPrincipal Member member, @PathVariable Long commentId) {
		commentService.deleteComment(commentId, member);
		return ResponseEntity.ok().build();
	}

	@ApiOperation(value = "댓글 수정 api", notes = "댓글을 수정하고 수정된 댓글을 반환합니다.")
	@PatchMapping("/comments/{commentId}")
	public ResponseEntity<CommentDto> modifyComment(@AuthenticationPrincipal Member member, @PathVariable Long commentId, @RequestBody RequestComment requestComment) {
		return ResponseEntity.ok(commentService.modifyComment(commentId, member, requestComment.getContent()));
	}

	@ApiOperation(value = "댓글 조회 api", notes = "해당 리포트 있는 댓글을 조회합니다")
	@GetMapping("/reports/{reportId}/comments")
	public ResponseEntity<List<CommentDto>> getCommentList(@PathVariable Long reportId) {
		return ResponseEntity.ok(commentService.getCommentList(reportId));
	}

}
