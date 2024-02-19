package ssafy.muchung.member.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ssafy.muchung.member.entity.Member;
import ssafy.muchung.member.repository.MemberRepository;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	private final TokenProvider tokenProvider;

	private final MemberRepository memberRepository;

	@Override
	protected void doFilterInternal(
		HttpServletRequest request, HttpServletResponse response, FilterChain filterChain
		) throws ServletException, IOException
	{
		String token = parseBearerToken(request);

		// 현재 request의 servletPath 및 URL 정보를 로깅
		String servletPath = request.getServletPath();
		String requestURL = request.getRequestURL().toString();
		log.info("URL: [{}] | servletPath: [{}] | Filter is running!", requestURL, servletPath);

		try {
			if (token != null && !token.equalsIgnoreCase("null")) {
				Long id = tokenProvider.validateAndGetId(token);
				log.info("Token {}", token);
				log.info("Authenticated id: {}", id);

				Member member = memberRepository.findById(id).orElseThrow();

				AbstractAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
					member, token, AuthorityUtils.NO_AUTHORITIES);

				authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
				securityContext.setAuthentication(authenticationToken);
				SecurityContextHolder.setContext(securityContext);

				log.info("Authentication {} ", SecurityContextHolder.getContext().getAuthentication());
			}
		} catch (Exception e) {
			log.error("Could not set authentication in security context", e);
		}

		filterChain.doFilter(request, response);
	}

	private String parseBearerToken(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");

		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7);
		}

		return null;
	}
}
