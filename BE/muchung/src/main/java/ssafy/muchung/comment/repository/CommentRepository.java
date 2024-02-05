package ssafy.muchung.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ssafy.muchung.comment.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

}
