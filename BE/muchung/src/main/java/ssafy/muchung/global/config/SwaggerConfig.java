package ssafy.muchung.global.config;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import nonapi.io.github.classgraph.fileslice.ArraySlice;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.builders.RequestParameterBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.RequestParameter;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.service.SecurityScheme;
import springfox.documentation.service.Server;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class SwaggerConfig {
	@Bean
	public Docket api() {
		Server serverLocal = new Server("local", "http://localhost:8080", "for local testing", Collections.emptyList(), Collections.emptyList());
		Server serverDev = new Server("dev", "https://i10a307.p.ssafy.io/api", "for developing", Collections.emptyList(), Collections.emptyList());

		return new Docket(DocumentationType.OAS_30)
			.servers(serverDev, serverLocal)
			.ignoredParameterTypes(Principal.class)
			// .globalRequestParameters(parameters)
			.useDefaultResponseMessages(true) // Swagger 에서 제공해주는 기본 응답 코드를 표시할 것이면 true
			.select()
			.apis(RequestHandlerSelectors.basePackage("ssafy.muchung")) // Controller가 들어있는 패키지. 이 경로의 하위에 있는 api만 표시됨.
			.paths(PathSelectors.any()) // 위 패키지 안의 api 중 지정된 path만 보여줌. (any()로 설정 시 모든 api가 보여짐)
			.build()
			.apiInfo(apiInfo())
			.securityContexts(List.of(securityContext()))
			.securitySchemes(List.of(apiKey()));
	}

	public ApiInfo apiInfo() {
		return new ApiInfoBuilder()
			.title("Muchung SpringBoot Rest API Documentation")
			.description("무청컴퍼니 Project")
			.version("1.0.0")
			.build();
	}

	// JWT SecurityContext 구성
	private SecurityContext securityContext() {
		return SecurityContext.builder()
			.securityReferences(defaultAuth())
			.build();
	}

	private List<SecurityReference> defaultAuth() {
		AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
		AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
		authorizationScopes[0] = authorizationScope;
		return List.of(new SecurityReference("Authorization", authorizationScopes));
	}

	// ApiKey 정의
	private ApiKey apiKey() {
		return new ApiKey("Authorization", "Authorization", "header");
	}
}
