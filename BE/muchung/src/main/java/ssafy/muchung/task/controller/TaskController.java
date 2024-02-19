package ssafy.muchung.task.controller;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;
import ssafy.muchung.member.entity.Member;
import ssafy.muchung.task.dto.request.CompleteTask;
import ssafy.muchung.task.dto.request.CreateTask;
import ssafy.muchung.task.service.TaskService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tasks")
public class TaskController {

	private final TaskService taskService;

	@ApiOperation(value = "업무 생성", notes = "업무 생성 (현재 멤버 아이디는 항상 1)")
	@PostMapping()
	public ResponseEntity<?> createTask(
			@ApiIgnore @AuthenticationPrincipal Member member,
			@RequestBody CreateTask createTask
	) {
		taskService.createTask(member, createTask);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@ApiOperation(value = "업무 조회", notes = "날짜(yyyy-MM-dd)에 해당하는 본인의 업무 조회")
	@GetMapping()
	public ResponseEntity<?> getTasks(
			@ApiIgnore @AuthenticationPrincipal Member member,
			@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date
	) {
		return ResponseEntity.ok(taskService.getTasksByDate(member, date));
	}

	@ApiOperation(value = "데일리 업무 조회", notes = "오늘 본인의 업무 조회")
	@GetMapping("/daily")
	public ResponseEntity<?> getTasks(@ApiIgnore @AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(taskService.getTasksByDate(member, LocalDate.now()));
	}

	@ApiOperation(value = "업무 삭제", notes = "ID 기반 업무 삭제")
	@DeleteMapping("/{taskId}")
	public ResponseEntity<?> deleteTask(
			@ApiIgnore @AuthenticationPrincipal Member member,
			@PathVariable final Long taskId
	) {
		taskService.deleteTask(member, taskId);

		return ResponseEntity.ok().build();
	}

	/*
	 * 	업무 완료 처리 POST
	 * 	param: taskId, imageURL
	 * */
	@ApiOperation(value = "업무 완료 처리", notes = "업무 인증샷 URL를 전송하면 완료 처리 됨.")
	@PostMapping("/{taskId}/complete")
	public ResponseEntity<?> completeTask(
			@ApiIgnore @AuthenticationPrincipal Member member,
			@PathVariable Long taskId,
			@RequestBody CompleteTask completeTask
	) {
		taskService.updateTaskCompletionImage(member, taskId, completeTask);

		return ResponseEntity.ok().build();
	}

	// 채팅 시작 시 [등록한 업무 & 이행 여부] 포맷팅 해서 던져주는 용도
	@ApiOperation(value = "날짜별 등록한 업무 & 이행 여부 조회", notes = "날짜(yyyy-MM-dd)에 해당하는 본인의 업무와 이행 여부 조회")
	@GetMapping("/chat")
	public ResponseEntity<?> getTasksAndIsCompleted(
			@ApiIgnore @AuthenticationPrincipal Member member,
			@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date
	) {
		return ResponseEntity.ok(taskService.getTasksAndIsCompletedInFormat(member, date));
	}
}
