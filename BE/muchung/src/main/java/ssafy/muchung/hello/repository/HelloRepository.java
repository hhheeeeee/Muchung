package ssafy.muchung.hello.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ssafy.muchung.hello.entity.Hello;

@Repository
public interface HelloRepository extends JpaRepository<Hello, Long> {

}
