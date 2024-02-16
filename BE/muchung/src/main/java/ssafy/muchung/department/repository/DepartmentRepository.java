package ssafy.muchung.department.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ssafy.muchung.department.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
	Optional<Department> findById(Long id);
}
