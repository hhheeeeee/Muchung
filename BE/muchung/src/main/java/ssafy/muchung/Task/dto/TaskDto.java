package ssafy.muchung.task.dto;

import lombok.Builder;
import lombok.Getter;
import ssafy.muchung.task.entity.Task;

@Getter
@Builder
public class TaskDto {
	private Long id;
	private String title;
	private Boolean isCompleted;
	private String completionImage;

	public static TaskDto fromEntity(Task task) {
		return TaskDto.builder()
			.id(task.getId())
			.title(task.getTitle())
			.isCompleted(task.getIsCompleted())
			.completionImage(task.getCompletionImage())
			.build();
	}
}
