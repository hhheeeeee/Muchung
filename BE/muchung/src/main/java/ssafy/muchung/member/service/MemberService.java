package ssafy.muchung.member.service;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.apache.commons.collections4.Trie;
import org.apache.commons.collections4.trie.PatriciaTrie;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ssafy.muchung.department.entity.Department;
import ssafy.muchung.department.repository.DepartmentRepository;
import ssafy.muchung.email.dto.response.GetEmailInformation;
import ssafy.muchung.member.dto.MemberDto;
import ssafy.muchung.member.dto.request.SaveMemberInformation;
import ssafy.muchung.member.dto.request.UpdateMemberInformation;
import ssafy.muchung.member.dto.response.GetMemberInformation;
import ssafy.muchung.member.entity.Member;
import ssafy.muchung.member.repository.MemberRepository;
import ssafy.muchung.member.type.StatusType;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepository memberRepository;
	private final DepartmentRepository departmentRepository;

	private final Trie<String, MemberDto> trie = new PatriciaTrie<>();

	@Transactional
	public void saveMemberInformation(Long id, SaveMemberInformation saveMemberInformation) {
		Member member = memberRepository.findById(id).orElseThrow();

		member.setName(saveMemberInformation.getName());
		member.setPhone(saveMemberInformation.getPhone());
		member.setDescription(saveMemberInformation.getDescription());
		member.setProfileImage(saveMemberInformation.getProfileImage());
		member.setStatus(StatusType.INFORMATION);

		addAutocompleteKeyword(member); // 자동완성
	}

	@Transactional
	public void updateMemberStatusToInterview(Long id) {
		Member member = memberRepository.findById(id).orElseThrow();

		member.setStatus(StatusType.INTERVIEW);
	}

	@Transactional
	public GetEmailInformation updateMemberDepartment(Long id, Long departmentId) {
		Member member = memberRepository.findById(id).orElseThrow();
		Department department = departmentRepository.findById(departmentId).orElseThrow();

		member.setStatus(StatusType.NCS);
		member.setDepartment(department);

		return GetEmailInformation.builder()
			.name(member.getName())
			.email(member.getEmail())
			.departmentName(department.getName())
			.build();
	}

	public GetMemberInformation getMemberInformation(Long id) {
		Member member = memberRepository.findById(id).orElseThrow();
		Department department = member.getDepartment();

		LocalDate now = LocalDate.now();
		Period period = Period.between(member.getCreatedAt().toLocalDate(), now);

		return GetMemberInformation.builder()
			.id(member.getId())
			.name(member.getName())
			.profileImage(member.getProfileImage())
			.phone(member.getPhone())
			.description(member.getDescription())
			.email(member.getEmail())
			.departmentName(department.getName())
			.nDays(period.getDays())
			.build();
	}

	@Transactional
	public void updateMemberInformation(Long id, UpdateMemberInformation updateMemberInformation) {
		Member member = memberRepository.findById(id).orElseThrow();
		member.setPhone(updateMemberInformation.getPhone());
		member.setProfileImage(updateMemberInformation.getProfileImage());
		member.setDescription(updateMemberInformation.getDescription());
	}

	@Transactional
	public void deleteMember(Long id) {
		Member member = memberRepository.findById(id).orElseThrow();
		member.setStatus(null);

		deleteAutocompleteKeyword(member);
	}

	public List<MemberDto> autocomplete(String keyword) {
		//initializeTrie(); // 실제 배포 시 제거할 것, test용 서버 돌리는 중에 insert된 데이터 처리

		return new ArrayList<>(trie.prefixMap(keyword.toLowerCase()).values());
	}

	private void addAutocompleteKeyword(Member member) {
		trie.put(member.getEmail().toLowerCase(), MemberDto.fromEntity(member));
	}

	public void deleteAutocompleteKeyword(Member member) {
		trie.remove(member.getEmail().toLowerCase());
	}

	@PostConstruct
	private void initializeTrie() {
		memberRepository.findAll()
			.forEach(this::addAutocompleteKeyword);
	}
}
