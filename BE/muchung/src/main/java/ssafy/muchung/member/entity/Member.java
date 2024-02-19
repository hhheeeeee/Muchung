package ssafy.muchung.member.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ssafy.muchung.department.entity.Department;
import ssafy.muchung.global.entity.BaseTimeEntity;
import ssafy.muchung.member.type.StatusType;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Member extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	private String name;

	@Column
	private String email;

	@Column
	private String phone;

	@Column
	private String description;

	@Column
	private String profileImage;

	@Column
	@Enumerated(EnumType.STRING)
	private StatusType status;

	@ManyToOne()
	@JoinColumn(name = "department_id")
	private Department department;
}
