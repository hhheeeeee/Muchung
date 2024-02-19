package ssafy.muchung.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.web.filter.CorsFilter;

import lombok.RequiredArgsConstructor;
import ssafy.muchung.member.security.JwtAuthenticationFilter;
import ssafy.muchung.member.security.OAuthSuccessHandler;
import ssafy.muchung.member.security.OAuthUserServiceImpl;
import ssafy.muchung.member.security.RedirectUrlCookieFilter;

@EnableWebSecurity()
@RequiredArgsConstructor
public class WebSecurityConfig {
	private final RedirectUrlCookieFilter redirectUrlCookieFilter;

	private final JwtAuthenticationFilter jwtAuthenticationFilter;

	private final OAuthUserServiceImpl oAuthUserService;

	private final OAuthSuccessHandler oAuthSuccessHandler;

	private static final String[] PERMITTED = {
		"/v3/api-docs",
		"/h2-console/**",
		"/favicon.ico",
		"/swagger**/**"
	};

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return (web) -> web.ignoring().antMatchers(PERMITTED);
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.cors()
			.and()
			.csrf()
			.disable()
			.httpBasic()
			.disable()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.authorizeRequests()
			.antMatchers("/", "/auth/**", "/oauth2/**", "/kakaoLogin/**", "/hello**/**", "/token**/**").permitAll()
			.anyRequest()
			.authenticated()
			.and()
			.headers()
			.frameOptions()
			.disable()
			.and()
			.oauth2Login()
			.redirectionEndpoint()
			.baseUri("/oauth2/callback/**")
			.and()
			.authorizationEndpoint()
			.baseUri("/auth/authorize")
			.and()
			.userInfoEndpoint()
			.userService(oAuthUserService)
			.and()
			.successHandler(oAuthSuccessHandler)
			.and()
			.exceptionHandling()
			.authenticationEntryPoint(new Http403ForbiddenEntryPoint());

		http.addFilterAfter(jwtAuthenticationFilter, CorsFilter.class);
		http.addFilterBefore(redirectUrlCookieFilter, OAuth2AuthorizationRequestRedirectFilter.class);

		return http.build();
	}
}
