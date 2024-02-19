package ssafy.muchung.recommend.service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import ssafy.muchung.member.entity.Member;
import ssafy.muchung.member.repository.MemberRepository;
import ssafy.muchung.recommend.dto.request.CreateRecommend;
import ssafy.muchung.recommend.entity.Recommend;
import ssafy.muchung.recommend.entity.RecommendDto;
import ssafy.muchung.recommend.repository.RecommendRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecommendService {
	private final RecommendRepository recommendRepository;
	private final MemberRepository memberRepository;

	public void createRecommend(long memberId, CreateRecommend createRecommend) {
		Member member = findMemberById(memberId);
		for (int i = 0; i < createRecommend.getTitle().size(); i++) {
			Recommend recommend = Recommend.builder()
				.member(member)
				.title(createRecommend.getTitle().get(i))
				.reason(createRecommend.getReason().get(i))
				.baseTime(LocalDate.now())
				.build();
			recommendRepository.save(recommend);
		}
	}

	public List<RecommendDto> getEveryRecommendation(long memberId, long RECOMMEND_SIZE) {
		List<Recommend> myRecommends = recommendRepository.findAllByMemberIdAndBaseTime(memberId, LocalDate.now().minusDays(1));
		if (myRecommends.isEmpty()) {
			myRecommends = getRandomRecommends(RECOMMEND_SIZE);
		}

		return myRecommends
				.stream()
				.map(RecommendDto::fromEntity)
				.collect(Collectors.toList());
	}

	private List<Recommend> getRandomRecommends(Long size) {
		List<Recommend> myRecommends = new ArrayList<>();
		List<Recommend> recommendList = recommendRepository.findAll();
		Collections.shuffle(recommendList);
		Set<String> uniqueTitles = new HashSet<>();

		for (Recommend recommend : recommendList) {
			if (!uniqueTitles.contains(recommend.getTitle())) {
				uniqueTitles.add(recommend.getTitle());
				myRecommends.add(recommend);

				if (myRecommends.size() >= size) {
					break;
				}
			}
		}

		return myRecommends;
	}

	private Member findMemberById(long memberId) {
		return memberRepository.findById(memberId)
			.orElseThrow(() -> new RuntimeException("멤버 없음")); // member 개발하면 대체
	}
}
