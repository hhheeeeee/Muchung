package ssafy.muchung.task.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import ssafy.muchung.global.exception.GlobalException;
import ssafy.muchung.global.exception.type.ExceptionCode;
import ssafy.muchung.member.entity.Member;
import ssafy.muchung.task.dto.TaskDto;
import ssafy.muchung.task.dto.request.CompleteTask;
import ssafy.muchung.task.dto.request.CreateTask;
import ssafy.muchung.task.entity.Task;
import ssafy.muchung.task.exception.ErrorCode;
import ssafy.muchung.task.exception.TaskException;
import ssafy.muchung.task.repository.TaskRepository;

@Service
@RequiredArgsConstructor
public class TaskService {

	private final TaskRepository taskRepository;

	public void createTask(Member member, CreateTask createTask) {
		taskRepository.save(Task.builder()
			.member(member)
			.title(createTask.getTitle())
			.taskDate(LocalDate.now())
			.isCompleted(Boolean.FALSE)
			.build());
	}

	public List<TaskDto> getTasksByDate(Member member, LocalDate date) {
		return taskRepository.findByMemberIdAndTaskDate(member.getId(), date)
			.stream()
			.map(TaskDto::fromEntity)
			.collect(Collectors.toList());
	}

	public void deleteTask(Member member, Long taskId) {
		Task task = findByTaskId(taskId);
		checkPermission(task.getMember().getId(), member.getId());
		taskRepository.delete(task);
	}

	private void checkPermission(Long commentId, Long memberId) {
		if (!Objects.equals(commentId, memberId)) {
			throw new GlobalException(ExceptionCode.NO_PERMISSION);
		}
	}

	@Transactional
	public void updateTaskCompletionImage(Member member, long taskId, CompleteTask completeTask) {
		Task task = findByTaskId(taskId);
		checkPermission(task.getMember().getId(), member.getId());
		task.completeTask(completeTask.getImage());
	}

	private Task findByTaskId(Long taskId) {
		return taskRepository.findById(taskId)
			.orElseThrow(() -> new TaskException(ErrorCode.NOT_FOUND_TASK));
	}

	public String getTasksAndIsCompletedInFormat(Member member, LocalDate date) {
		List<Task> taskList = taskRepository.findByMemberIdAndTaskDate(member.getId(), date);

		StringBuilder stringBuilder = new StringBuilder();
		for (int i = 0; i < taskList.size(); i++) {
			stringBuilder.append(i + 1).append(". ").append(taskList.get(i).getTitle());
			if (taskList.get(i).getIsCompleted()) stringBuilder.append(" (성공)\n");
			else stringBuilder.append(" (실패)\n");
		}

		return stringBuilder.toString().trim();
	}
}
