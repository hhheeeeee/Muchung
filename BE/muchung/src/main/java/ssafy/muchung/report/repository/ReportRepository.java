package ssafy.muchung.report.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ssafy.muchung.member.entity.Member;
import ssafy.muchung.report.dto.response.ReportDetail;
import ssafy.muchung.report.dto.response.ReportsFeed;
import ssafy.muchung.report.entity.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
	Page<Report> findAll(Pageable pageable);

	Optional<Report> findByIdAndMember(Long reportId, Member member);

	Optional<Report> findByReportDateAndMember(LocalDate reportDate, Member member);

	@Query(value =
		"SELECT new ssafy.muchung.report.dto.response.ReportsFeed(r.id, m.id, m.name, m.profileImage, m.department.name, r.review, r.reportDate,"
			+ " (select COUNT(*) from Likes l where l.report.id = r.id) ," //좋아요 개수, 댓글 개수
			+ " (select COUNT(*) from Likes l where l.report.id = r.id and l.member.id = :loginMemberId))"
			+ " FROM Report r JOIN r.member m")
	List<ReportsFeed> getReportsFeed(Pageable pageable, Long loginMemberId);

	@Query(value =
		"SELECT new ssafy.muchung.report.dto.response.ReportDetail(m.id, m.name, m.profileImage, r.reportDate, r.review, "
			+ " (select COUNT(*) from Likes l where l.report.id = r.id) ," //좋아요 개수
			+ " (select COUNT(*) from Likes l where l.report.id = r.id and l.member.id = :loginMemberId))" // 내가 좋아요 한 여부
			+ " FROM Report r JOIN r.member m where r.id = :reportId")
	ReportDetail getReportDetail(long reportId, Long loginMemberId);

	@Query(value =
		"SELECT new ssafy.muchung.report.dto.response.ReportDetail(m.id, m.name, m.profileImage, r.reportDate, r.review, "
			+ " (select COUNT(*) from Likes l where l.report.id = r.id) ," //좋아요 개수
			+ " (select COUNT(*) from Likes l where l.report.id = r.id and l.member.id = :loginMemberId))" // 내가 좋아요 한 여부
			+ " FROM Report r JOIN r.member m where r.id = :reportId")
	ReportDetail getReportDetail(Long reportId, Long loginMemberId);

	@Query(value = "select r from Report r "
		+ "where MONTH(r.reportDate) = :month and YEAR(r.reportDate) = :year "
		+ "and r.member.id = :memberId")
	List<Report> findByReportDate(Long memberId, Integer year, Integer month);
}
