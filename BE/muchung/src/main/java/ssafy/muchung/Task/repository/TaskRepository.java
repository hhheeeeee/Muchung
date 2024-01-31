package ssafy.muchung.task.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ssafy.muchung.task.entity.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

	List<Task> findByMemberIdAndTaskDate(Long member_id, LocalDate taskDate);
}
