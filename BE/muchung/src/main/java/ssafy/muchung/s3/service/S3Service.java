package ssafy.muchung.s3.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ssafy.muchung.member.entity.Member;
import ssafy.muchung.report.dto.request.CreateReport;
import ssafy.muchung.report.entity.Report;
import ssafy.muchung.task.entity.Task;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String uploadFile(MultipartFile file) {

        String fileOriginalName = file.getOriginalFilename(); // 원본 파일 이름
        String fileExtension = fileOriginalName.split("\\.")[1];

        UUID uuid = UUID.randomUUID();
        String fileNewName = uuid + "." + fileExtension; // 저장되는 파일 이름

        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            amazonS3Client.putObject(
                    new PutObjectRequest(bucket, fileNewName, file.getInputStream(), null)
                            .withCannedAcl(CannedAccessControlList.PublicRead)
            );
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("AWS S3 업로드 오류");
        }

        return String.valueOf(amazonS3Client.getUrl(bucket, fileNewName));
    }

}
