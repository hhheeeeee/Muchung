package ssafy.muchung.member.security;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import ssafy.muchung.member.entity.Member;

public class OAuth2Member implements OAuth2User {
	private Member member;

	private Collection<? extends GrantedAuthority> authorities;
	private Map<String, Object> attributes;

	public OAuth2Member(Member member, Map<String, Object> attributes) {
		this.member = member;
		this.authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
		this.attributes = attributes;
	}

	@Override
	public Map<String, Object> getAttributes() {
		return this.attributes;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.authorities;
	}

	@Override
	public String getName() {
		return member.getEmail();
	}

	public Long getId() {
		return member.getId();
	}
}
