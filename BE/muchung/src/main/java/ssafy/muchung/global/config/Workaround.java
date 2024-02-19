package ssafy.muchung.global.config;

import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.servers.Server;
import springfox.documentation.oas.web.OpenApiTransformationContext;
import springfox.documentation.oas.web.WebMvcOpenApiTransformationFilter;
import springfox.documentation.spi.DocumentationType;

/*
	swagger-ui 설정 파일
	참고: https://velog.io/@no-oneho/Swagger-servers%EC%97%90-%EB%A1%9C%EC%BB%AC%EB%B0%8F-%EB%B0%B0%ED%8F%AC%ED%99%98%EA%B2%BD-%EC%84%9C%EB%B2%84-%EC%B6%94%EA%B0%80
 */

@Component
public class Workaround implements WebMvcOpenApiTransformationFilter {
	@Override
	public OpenAPI transform(OpenApiTransformationContext<HttpServletRequest> context) {
		OpenAPI openApi = context.getSpecification();
		Server serverLocal = new Server();
		serverLocal.setDescription("local");
		serverLocal.setUrl("http://localhost:8080");

		Server serverDev = new Server();
		serverDev.setDescription("dev");
		serverDev.setUrl("https://i10a307.p.ssafy.io/api");

		openApi.setServers(Arrays.asList(serverDev, serverLocal));
		return openApi;
	}

	@Override
	public boolean supports(DocumentationType documentationType) {
		return documentationType.equals(DocumentationType.OAS_30);
	}
}
