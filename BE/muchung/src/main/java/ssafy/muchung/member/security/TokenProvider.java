package ssafy.muchung.member.security;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TokenProvider {
	private final String SECRET_KEY;
	private final long tokenValidityInMilliseconds;

	public TokenProvider(
		@Value("${jwt.secret}") String secret,
		@Value("${jwt.token-validity-in-seconds}") long tokenValidityInSeconds) {
		this.SECRET_KEY = secret;
		this.tokenValidityInMilliseconds = tokenValidityInSeconds * 1000;
	}

	public String create(final Authentication authentication) {
		OAuth2Member memberPrincipal = (OAuth2Member)authentication.getPrincipal();

		Date expiryDate = Date.from(Instant.now().plus(tokenValidityInMilliseconds, ChronoUnit.MILLIS));

		return Jwts.builder()
			.signWith(SignatureAlgorithm.HS256, SECRET_KEY)
			.setSubject(memberPrincipal.getId().toString())
			.setIssuer("Muchung")
			.setIssuedAt(new Date())
			.setExpiration(expiryDate)
			.compact();
	}

	public Long validateAndGetId(String token) {
		Claims claims = Jwts.parser()
			.setSigningKey(SECRET_KEY)
			.parseClaimsJws(token)
			.getBody();

		return Long.parseLong(claims.getSubject());
	}
}
