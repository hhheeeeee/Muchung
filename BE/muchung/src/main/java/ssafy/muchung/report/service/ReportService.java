package ssafy.muchung.report.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import ssafy.muchung.comment.dto.CommentDto;
import ssafy.muchung.comment.repository.CommentRepository;
import ssafy.muchung.member.entity.Member;
import ssafy.muchung.member.repository.MemberRepository;
import ssafy.muchung.report.dto.request.CreateReport;
import ssafy.muchung.report.dto.request.PagingCondition;
import ssafy.muchung.report.dto.request.YearMonth;
import ssafy.muchung.report.dto.response.MonthlyReports;
import ssafy.muchung.report.dto.response.MyReportDetail;
import ssafy.muchung.report.dto.response.ReportDetail;
import ssafy.muchung.report.dto.response.ReportsFeed;
import ssafy.muchung.report.entity.Likes;
import ssafy.muchung.report.entity.Report;
import ssafy.muchung.report.repository.LikeRepository;
import ssafy.muchung.report.repository.ReportRepository;
import ssafy.muchung.task.dto.TaskDto;
import ssafy.muchung.task.entity.Task;
import ssafy.muchung.task.repository.TaskRepository;

@Service
@RequiredArgsConstructor
public class ReportService {
	private final MemberRepository memberRepository;
	private final ReportRepository reportRepository;
	private final TaskRepository taskRepository;
	private final LikeRepository likeRepository;
	private final CommentRepository commentRepository;

	@Transactional
	public void createReport(Member member, CreateReport createReport) {
		// 이미 작성한 리뷰면 review 업데이트
		Report todayReport = reportRepository.findByReportDateAndMember(LocalDate.now(), member).orElse(null);
		if (todayReport != null) {
			todayReport.updateReview(createReport.getReview());
			return;
		}

		// 완료한 업무 가져오기
		List<Task> tasks = taskRepository.findByMemberIdAndTaskDateAndIsCompleted(member.getId(), LocalDate.now(),
			Boolean.TRUE);

		// 리포트 생성 후 넣어주기
		Report report = Report.builder()
			.member(member)
			.tasks(tasks)
			.review(createReport.getReview())
			.reportDate(LocalDate.now())
			.thumbnail(!tasks.isEmpty() ? tasks.get(0).getCompletionImage() : null)
			.build();

		reportRepository.save(report);
	}

	private Member findMemberById(long memberId) {
		return memberRepository.findById(memberId)
			.orElseThrow(() -> new RuntimeException("멤버 없음")); // member 개발하면 대체
	}

	public MyReportDetail getMyReportDetail(Member member, Long reportId) {
		Report reports = reportRepository.findByIdAndMember(reportId, member)
			.orElseThrow(() -> new RuntimeException("없음"));

		return MyReportDetail.fromEntity(reports);
	}

	public List<ReportsFeed> getReportsFeed(Member member, PagingCondition pagingCondition) {
		Pageable pageable = PageRequest.of(pagingCondition.getPage(), pagingCondition.getLimit(),
			Sort.by("reportDate").descending());

		List<ReportsFeed> reportsFeeds = reportRepository.getReportsFeed(pageable, member.getId());

		reportsFeeds.forEach(
				reportsFeed -> {
					reportsFeed.setComments(commentRepository.findAllByReportId(reportsFeed.getId())
							.stream()
							.map(CommentDto::fromEntity)
							.collect(Collectors.toList()));

					reportsFeed.setTasks(
							taskRepository.findAllByReportId(reportsFeed.getId())
									.stream()
									.map(TaskDto::fromEntity)
									.collect(Collectors.toList())
					);
				}
		);

		return reportsFeeds;
	}

	public void likeReport(Member member, long reportId) {
		Report report = findReportById(reportId);

		Likes likes = likeRepository.findByMemberAndReportId(member, reportId).orElse(null);

		if (Objects.nonNull(likes)) { // 이미 좋아요 눌러진 상태
			likeRepository.delete(likes);
			return;
		}

		likeRepository.save(Likes.builder()
			.member(member)
			.report(report)
			.build());
	}

	private Report findReportById(long reportId) {
		return 	reportRepository.findById(reportId)
			.orElseThrow(() -> new RuntimeException("보고서가 없어용."));
	}

	public ReportDetail getReportDetail(Member member, Long reportId) {
		Report report = findReportById(reportId);

		ReportDetail reportDetail = reportRepository.getReportDetail(reportId, member.getId());

		reportDetail.setComments(commentRepository.findAllByReportId(reportId)
				.stream()
				.map(CommentDto::fromEntity)
				.collect(Collectors.toList()));

		reportDetail.setTasks(taskRepository.findAllByReportId(reportId)
			.stream()
			.map(TaskDto::fromEntity)
			.collect(Collectors.toList()));

		return reportDetail;
	}

	public List<MonthlyReports> getMonthlyReports(YearMonth yearMonth, Member member) {
		List<Report> reports = reportRepository.findByReportDate(member.getId(), yearMonth.getYear(),
			yearMonth.getMonth());

		return reports
			.stream()
			.map(MonthlyReports::fromEntity)
			.collect(Collectors.toList());
	}
}
