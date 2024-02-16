package ssafy.muchung.recommend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ssafy.muchung.recommend.entity.Recommend;

@Repository
public interface RecommendRepository extends JpaRepository<Recommend, Long> {

	List<Recommend> findAllByMemberIdAndBaseTime(Long memberId, LocalDate baseTime);

}
