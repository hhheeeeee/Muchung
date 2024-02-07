package ssafy.muchung.comment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ssafy.muchung.comment.entity.Comment;
import ssafy.muchung.report.entity.Report;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
	List<Comment> findAllByReport(Report report);
}
