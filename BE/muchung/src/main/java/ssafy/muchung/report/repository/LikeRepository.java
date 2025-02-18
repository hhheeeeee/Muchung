package ssafy.muchung.report.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ssafy.muchung.member.entity.Member;
import ssafy.muchung.report.entity.Likes;

@Repository
public interface LikeRepository extends JpaRepository<Likes, Long> {
	Optional<Likes> findByMemberAndReportId(Member member, Long report_id);

}
