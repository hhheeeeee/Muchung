package ssafy.muchung.member.controller;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
public class TokenController {
	@GetMapping("/token")
	public ResponseEntity<?> getToken(@Value("${jwt.secret}") String SECRET_KEY) {
		Date expiryDate = Date.from(Instant.now().plus(1, ChronoUnit.DAYS));

		String token = Jwts.builder()
			.signWith(SignatureAlgorithm.HS256, SECRET_KEY)
			.setSubject("1")
			.setIssuer("Muchung")
			.setIssuedAt(new Date())
			.setExpiration(expiryDate)
			.compact();

		return ResponseEntity.ok(token);
	}

	@GetMapping("/token/members/{memberId}")
	public ResponseEntity<?> getTokenMemberId(@Value("${jwt.secret}") String SECRET_KEY, @PathVariable Long memberId) {
		Date expiryDate = Date.from(Instant.now().plus(1, ChronoUnit.DAYS));

		String token = Jwts.builder()
				.signWith(SignatureAlgorithm.HS256, SECRET_KEY)
				.setSubject(memberId.toString())
				.setIssuer("Muchung")
				.setIssuedAt(new Date())
				.setExpiration(expiryDate)
				.compact();

		return ResponseEntity.ok(token);
	}
}
