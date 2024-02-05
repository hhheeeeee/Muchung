package ssafy.muchung.report.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ssafy.muchung.report.entity.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

	Report findByIdAndMemberId(Long reportId, Long memberId);

}
