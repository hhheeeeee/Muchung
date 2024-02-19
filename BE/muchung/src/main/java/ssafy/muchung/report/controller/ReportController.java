package ssafy.muchung.report.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import ssafy.muchung.member.entity.Member;
import ssafy.muchung.report.dto.request.CreateReport;
import ssafy.muchung.report.dto.request.PagingCondition;
import ssafy.muchung.report.dto.request.YearMonth;
import ssafy.muchung.report.dto.response.MonthlyReports;
import ssafy.muchung.report.dto.response.MyReportDetail;
import ssafy.muchung.report.dto.response.ReportDetail;
import ssafy.muchung.report.dto.response.ReportsFeed;
import ssafy.muchung.report.service.ReportService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reports")
public class ReportController {

	private final ReportService reportService;

	/*
		완료된 오늘의 업무만 올라간다.
		이미 등록된 보고서 일 경우 리뷰만 업데이트
	*/
	@ApiOperation(value = "보고서 작성", notes = "오늘의 업무 중 완료한 업무와 리뷰 데이터가 저장")
	@PostMapping()
	public ResponseEntity<?> createReport(@AuthenticationPrincipal Member member, @RequestBody CreateReport createReport) {
		reportService.createReport(member, createReport);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@ApiOperation(value = "내 보고서 조회", notes = "보고서 아이디로 나의 보고서를 조회.")
	@GetMapping("/myReports/{reportId}")
	public ResponseEntity<MyReportDetail> getReport(@AuthenticationPrincipal Member member, @PathVariable Long reportId) {
		return ResponseEntity.ok(reportService.getMyReportDetail(member, reportId));
	}

	// 페이징
	@ApiOperation(value = "보고서 게시물 목록 조회", notes = "게시물 목록을 조회")
	@GetMapping()
	public ResponseEntity<List<ReportsFeed>> view(@AuthenticationPrincipal Member member, PagingCondition pagingCondition) {
		return ResponseEntity.ok(reportService.getReportsFeed(member, pagingCondition));
	}

	// 피드 보고서 상세 조회 -> 댓글, 좋아요 내용 까지 조회
	@ApiOperation(value = "피드 보고서 상세 조회", notes = "피드 보고서 상세 조회, 좋아요, 댓글, 내가 좋아요 눌렀는지 여부까지 조회합니다.")
	@GetMapping("/{reportId}")
	public ResponseEntity<ReportDetail> getReportDetail(@AuthenticationPrincipal Member member, @PathVariable Long reportId) {
		return ResponseEntity.ok(reportService.getReportDetail(member, reportId));
	}

	@ApiOperation(value = "보고서에 좋아요", notes = "보고서에 좋아요 토글 기능을 제공합니다.")
	@PostMapping("/{reportId}/likes")
	public ResponseEntity<?> likeReport(@AuthenticationPrincipal Member member, @PathVariable Long reportId) {
		reportService.likeReport(member, reportId);
		return ResponseEntity.ok().build();
	}

	@ApiOperation(value = "내 캘린더 달 별 업무 보고서 조회", notes = "연도와 달을 보내주면 그 달의 보고서 기록 전송")
	@GetMapping("/monthly")
	public ResponseEntity<List<MonthlyReports>> getMonthlyReports(@AuthenticationPrincipal Member member, YearMonth yearMonth) {
		return ResponseEntity.ok(reportService.getMonthlyReports(yearMonth, member));
	}

}
