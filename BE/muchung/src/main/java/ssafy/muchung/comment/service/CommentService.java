package ssafy.muchung.comment.service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import ssafy.muchung.comment.dto.CommentDto;
import ssafy.muchung.comment.entity.Comment;
import ssafy.muchung.comment.repository.CommentRepository;
import ssafy.muchung.global.exception.GlobalException;
import ssafy.muchung.global.exception.type.ExceptionCode;
import ssafy.muchung.member.entity.Member;
import ssafy.muchung.report.entity.Report;
import ssafy.muchung.report.repository.ReportRepository;

@Service
@RequiredArgsConstructor
public class CommentService {
	private final CommentRepository commentRepository;
	private final ReportRepository reportRepository;

	public CommentDto createComment(Long reportId, Member member, String content) {
		Report report = getReport(reportId);

		return CommentDto.fromEntity(commentRepository.save(Comment.builder()
			.content(content)
			.report(report)
			.member(member)
			.build()));
	}

	private Report getReport(Long reportId) {
		return reportRepository.findById(reportId)
			.orElseThrow(() -> new RuntimeException("not found report"));
	}

	public void deleteComment(Long commentId, Member member) {
		Comment comment = getComment(commentId);

		checkPermission(comment.getMember().getId(), member.getId());

		commentRepository.delete(comment);
	}

	private Comment getComment(Long commentId) {
		return commentRepository.findById(commentId)
			.orElseThrow(() -> new RuntimeException("not found comment"));
	}

	@Transactional
	public CommentDto modifyComment(Long commentId, Member member, String content) {
		Comment comment = getComment(commentId);

		checkPermission(comment.getMember().getId(), member.getId());

		comment.updateContent(content);
		return CommentDto.fromEntity(comment);
	}

	private void checkPermission(Long commentId, Long memberId) {
		 if (!Objects.equals(commentId, memberId)) {
			 throw new GlobalException(ExceptionCode.NO_PERMISSION);
		 }
	}

	public List<CommentDto> getCommentList(Long reportId) {
		return commentRepository.findAllByReportId(reportId)
			.stream()
			.map(CommentDto::fromEntity)
			.collect(Collectors.toList());
	}
}
