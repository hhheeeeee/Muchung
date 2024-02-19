package ssafy.muchung.member.security;

import java.util.Map;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ssafy.muchung.member.entity.Member;
import ssafy.muchung.member.repository.MemberRepository;

@RequiredArgsConstructor
@Service
@Slf4j
public class OAuthUserServiceImpl extends DefaultOAuth2UserService {
	private final MemberRepository memberRepository;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		final OAuth2User oAuth2User = super.loadUser(userRequest);

		try {
			log.info("OAuth2User attributes: {}", new ObjectMapper().writeValueAsString(oAuth2User.getAttributes()));
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		Map<String, Object> account = (Map<String, Object>)oAuth2User.getAttributes().get("kakao_account");
		final String email = (String)account.get("email");
		Member member = null;
		log.info("email: {}", email);

		if (!memberRepository.existsByEmail(email)) {
			member = Member.builder()
				.email(email)
				.build();
			member = memberRepository.save(
				member
			);
		} else {
			member = memberRepository.findByEmail(email);
		}

		return new OAuth2Member(member, oAuth2User.getAttributes());
	}
}
