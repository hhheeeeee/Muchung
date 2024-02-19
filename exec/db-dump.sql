create table member
(
    id            bigint auto_increment
        primary key,
    created_at    datetime     null,
    modified_at   datetime     null,
    description   varchar(255) null,
    email         varchar(255) null,
    name          varchar(255) null,
    phone         varchar(255) null,
    profile_image varchar(255) null,
    status        varchar(255) null,
    department_id bigint       null,
    constraint FKlmd4h7lh9acdyvi0xxbvsqrmk
        foreign key (department_id) references department (id)
);

INSERT INTO muchung.member (id, created_at, modified_at, description, email, name, phone, profile_image, status, department_id) VALUES (1, '2024-02-12 08:00:57', '2024-02-16 02:21:49', '이거먼데', 'twinnkle991@naver.com', '이수현', '', '/static/media/blankimg.18fffc044c3ef4fd359d.jpg', 'NCS', 2);
INSERT INTO muchung.member (id, created_at, modified_at, description, email, name, phone, profile_image, status, department_id) VALUES (2, '2024-02-12 08:00:57', '2024-02-16 05:07:25', '', 'kth32105@naver.com', '김태훈', '', '/static/media/blankimg.18fffc044c3ef4fd359d.jpg', 'NCS', 2);
INSERT INTO muchung.member (id, created_at, modified_at, description, email, name, phone, profile_image, status, department_id) VALUES (3, '2024-02-12 08:00:57', null, '쭈녕이 이지롱', 'zizunyoung@kakao.com', '지준영', '010-5124-9876', 'https://image.cine21.com/resize/cine21/person/2024/0102/14_28_32__65939f00a5a58[X252,310].jpg', 'NCS', 2);
INSERT INTO muchung.member (id, created_at, modified_at, description, email, name, phone, profile_image, status, department_id) VALUES (4, '2024-02-12 17:02:46', '2024-02-15 23:42:31', '소개글입니당', 'rihyun1126@nate.com', '김이현', '', '/static/media/blankimg.18fffc044c3ef4fd359d.jpg', 'NCS', 3);
INSERT INTO muchung.member (id, created_at, modified_at, description, email, name, phone, profile_image, status, department_id) VALUES (5, '2024-02-12 17:15:23', '2024-02-12 17:15:43', '저입니다 ㅎㅇ', 'wodufdl48@naver.com', '재열', '01012341234', 'https://i.namu.wiki/i/uBPPGRUGuEygbIeMrnyGcjZMCJSR3eyEzKjXBJ62dh5aaKBlKruiCea3anJlurd4TVW2Sjg3pN5cCaCVE-HAPQ.svg', 'NCS', 1);
INSERT INTO muchung.member (id, created_at, modified_at, description, email, name, phone, profile_image, status, department_id) VALUES (7, '2024-02-12 18:18:45', '2024-02-16 04:30:49', '', 'senghee9801@naver.com', '', '', '/static/media/blankimg.18fffc044c3ef4fd359d.jpg', null, 1);
INSERT INTO muchung.member (id, created_at, modified_at, description, email, name, phone, profile_image, status, department_id) VALUES (8, '2024-02-13 14:48:48', '2024-02-15 00:40:46', '나는 멋쟁이에요', 'jijeki97@naver.com', '지준영', '01088373012', '/static/media/blankimg.18fffc044c3ef4fd359d.jpg', 'NCS', 3);
INSERT INTO muchung.member (id, created_at, modified_at, description, email, name, phone, profile_image, status, department_id) VALUES (9, '2024-02-14 11:54:03', '2024-02-14 11:54:42', '하이ㅋㅋ', 'barded1998@gmail.com', '차재환', '101111', '/static/media/blankimg.18fffc044c3ef4fd359d.jpg', 'NCS', 1);
INSERT INTO muchung.member (id, created_at, modified_at, description, email, name, phone, profile_image, status, department_id) VALUES (10, '2024-02-14 12:38:44', '2024-02-14 12:38:44', '지연씨 ㅎㅇ', 'jiyeon2536@khu.ac.kr', '김지연', '0102345', 'https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/JHLNEWBNKEMUTHH7Z3WKMCAWEI.jpg', 'NCS', 2);
INSERT INTO muchung.member (id, created_at, modified_at, description, email, name, phone, profile_image, status, department_id) VALUES (13, '2024-02-15 17:52:55', '2024-02-15 17:53:20', 'hello hello here we go', 'jason9865@kakao.com', '장승호', '01072790870', '/static/media/blankimg.18fffc044c3ef4fd359d.jpg', 'NCS', 3);
INSERT INTO muchung.member (id, created_at, modified_at, description, email, name, phone, profile_image, status, department_id) VALUES (14, '2024-02-15 19:14:34', '2024-02-15 19:14:50', '취업!', 'skydreamer21@naver.com', '김주현', '01012481632', '/static/media/blankimg.18fffc044c3ef4fd359d.jpg', 'NCS', 3);
INSERT INTO muchung.member (id, created_at, modified_at, description, email, name, phone, profile_image, status, department_id) VALUES (15, '2024-02-16 00:06:50', '2024-02-16 00:07:31', '취뽀하자', 'sohy19@gmail.com', '키키', '', '/static/media/blankimg.18fffc044c3ef4fd359d.jpg', 'NCS', 1);
INSERT INTO muchung.member (id, created_at, modified_at, description, email, name, phone, profile_image, status, department_id) VALUES (17, '2024-02-16 04:31:15', '2024-02-16 04:31:35', '저와.. 비슷한 분들이 많이 계실 거라 믿어요!', 'olafminion0116@naver.com', '이수현', '', '/static/media/blankimg.18fffc044c3ef4fd359d.jpg', 'NCS', 5);


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

create table notification
(
    id                bigint auto_increment
        primary key,
    created_at        datetime     null,
    modified_at       datetime     null,
    content           text         null,
    is_read           bit          null,
    notification_type varchar(255) null,
    received_date     datetime     null,
    sender            varchar(255) null,
    target_id         bigint       null,
    receiver_id       bigint       null,
    constraint FK1jpw68rbaxvu8u5l1dniain1l
        foreign key (receiver_id) references member (id)
);

INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (1, '2024-02-12 17:01:35', '2024-02-13 17:19:05', '이수현님으로부터 메일이 왔습니다.', true, 'MAIL', '2024-02-12 17:01:35', '이수현', 6, 1);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (2, '2024-02-12 17:03:34', '2024-02-12 17:03:34', '이수현님으로부터 메일이 왔습니다.', false, 'MAIL', '2024-02-12 17:03:34', '이수현', 7, 4);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (3, '2024-02-12 21:36:35', '2024-02-16 00:51:35', '이수현님으로부터 메일이 왔습니다.', true, 'MAIL', '2024-02-12 21:36:35', '이수현', 8, 2);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (15, '2024-02-13 12:43:17', '2024-02-13 12:43:17', '만두리님으로부터 메일이 왔습니다.', false, 'MAIL', '2024-02-13 12:43:17', '만두리', 20, 5);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (17, '2024-02-13 13:59:37', '2024-02-15 17:40:47', '만두리님으로부터 메일이 왔습니다.', true, 'MAIL', '2024-02-13 13:59:37', '만두리', 22, 7);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (44, '2024-02-13 22:54:23', '2024-02-13 22:54:23', '만두리님으로부터 메일이 왔습니다.', false, 'MAIL', '2024-02-13 22:54:23', '만두리', 49, 8);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (66, '2024-02-14 16:08:27', '2024-02-14 16:08:27', '이수현님으로부터 메일이 왔습니다.', false, 'MAIL', '2024-02-14 16:08:27', '이수현', 71, 1);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (70, '2024-02-14 20:39:59', '2024-02-14 20:39:59', '비밀님으로부터 메일이 왔습니다.', false, 'MAIL', '2024-02-14 20:39:59', '비밀', 75, 4);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (71, '2024-02-15 09:13:50', '2024-02-15 17:10:14', '김승희님으로부터 메일이 왔습니다.', true, 'MAIL', '2024-02-15 09:13:50', '김승희', 21, 7);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (72, '2024-02-15 14:47:15', '2024-02-15 17:10:12', 'ㄴㄴ님으로부터 메일이 왔습니다.', true, 'MAIL', '2024-02-15 14:47:15', 'ㄴㄴ', 22, 7);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (73, '2024-02-15 17:10:02', '2024-02-15 17:10:07', '김승희님으로부터 메일이 왔습니다.', true, 'MAIL', '2024-02-15 17:10:02', '김승희', 23, 7);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (74, '2024-02-15 17:35:16', '2024-02-15 17:40:46', '김승희님으로부터 메일이 왔습니다.', true, 'MAIL', '2024-02-15 17:35:16', '김승희', 24, 7);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (75, '2024-02-15 17:38:55', '2024-02-15 17:39:00', '김승희님으로부터 메일이 왔습니다.', true, 'MAIL', '2024-02-15 17:38:55', '김승희', 25, 7);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (76, '2024-02-15 21:17:08', '2024-02-15 21:23:18', '김승희님으로부터 메일이 왔습니다.', true, 'MAIL', '2024-02-15 21:17:08', '김승희', 26, 7);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (77, '2024-02-15 21:17:47', '2024-02-15 21:23:16', '김승희님으로부터 메일이 왔습니다.', true, 'MAIL', '2024-02-15 21:17:47', '김승희', 27, 7);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (78, '2024-02-15 21:23:27', '2024-02-15 21:26:39', '김승희님으로부터 메일이 왔습니다.', true, 'MAIL', '2024-02-15 21:23:27', '김승희', 28, 7);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (79, '2024-02-15 21:26:22', '2024-02-15 21:26:27', '김승희님으로부터 메일이 왔습니다.', true, 'MAIL', '2024-02-15 21:26:22', '김승희', 29, 7);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (80, '2024-02-15 21:27:59', '2024-02-15 21:28:04', '김승희님으로부터 메일이 왔습니다.', true, 'MAIL', '2024-02-15 21:27:59', '김승희', 30, 7);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (81, '2024-02-16 03:25:07', '2024-02-16 03:25:07', '김태훈님으로부터 메일이 왔습니다.', false, 'MAIL', '2024-02-16 03:25:07', '김태훈', 31, 8);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (82, '2024-02-16 04:16:32', '2024-02-16 04:16:32', '재열님으로부터 메일이 왔습니다.', false, 'MAIL', '2024-02-16 04:16:32', '재열', 32, 8);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (83, '2024-02-16 04:19:12', '2024-02-16 04:19:12', '님으로부터 메일이 왔습니다.', false, 'MAIL', '2024-02-16 04:19:12', '', 33, 7);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (84, '2024-02-16 04:32:34', '2024-02-16 04:32:34', '재열님으로부터 메일이 왔습니다.', false, 'MAIL', '2024-02-16 04:32:34', '재열', 34, 10);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (85, '2024-02-16 05:08:32', '2024-02-16 05:08:32', '김태훈님으로부터 메일이 왔습니다.', false, 'MAIL', '2024-02-16 05:08:32', '김태훈', 35, 5);
INSERT INTO muchung.notification (id, created_at, modified_at, content, is_read, notification_type, received_date, sender, target_id, receiver_id) VALUES (86, '2024-02-16 05:59:07', '2024-02-16 05:59:07', '재열님으로부터 메일이 왔습니다.', false, 'MAIL', '2024-02-16 05:59:07', '재열', 36, 8);


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

create table recommend
(
    id          bigint auto_increment
        primary key,
    created_at  datetime     null,
    modified_at datetime     null,
    base_time   date         not null comment '추천 기반 날짜(어제 날짜)',
    reason      varchar(255) not null comment '추천 이유',
    title       varchar(255) not null comment '추천 업무명',
    member_id   bigint       not null,
    constraint FKtp0goy0045lmlgnwfqhqlne6e
        foreign key (member_id) references member (id)
);

INSERT INTO muchung.recommend (id, created_at, modified_at, base_time, reason, title, member_id) VALUES (1, '2024-02-15 06:32:56', '2024-02-15 06:32:56', '2024-02-14', '운동은 체력을 키워주고 피로를 푸는데 도움이 됩니다. 피곤함을 극복하고 건강을 챙기기 위해 꾸준한 운동을 추천합니다.', '운동하기', 1);
INSERT INTO muchung.recommend (id, created_at, modified_at, base_time, reason, title, member_id) VALUES (2, '2024-02-15 06:32:56', '2024-02-15 06:32:56', '2024-02-14', '독서는 마음을 안정시키고 지식을 쌓는데 도움이 됩니다. 책을 읽으면서 새로운 영감을 얻고 흥미로운 이야기에 몰입하여 즐거움을 느낄 수 있습니다.', '독서하기', 1);
INSERT INTO muchung.recommend (id, created_at, modified_at, base_time, reason, title, member_id) VALUES (3, '2024-02-15 06:32:56', '2024-02-15 06:32:56', '2024-02-14', '산책은 신선한 공기를 마시며 몸과 마음을 풀어줍니다. 일상 생활에서 벗어나 자연과 소통하며 힐링을 할 수 있는 좋은 방법입니다.', '산책하기', 1);
INSERT INTO muchung.recommend (id, created_at, modified_at, base_time, reason, title, member_id) VALUES (10, '2024-02-15 06:42:01', '2024-02-15 06:42:01', '2024-02-15', '운동은 몸과 마음에 좋은 영향을 줄 수 있어요. 피로를 풀고 에너지를 충전할 수 있으며, 자신감을 높여줄 수도 있어요.', '운동하기', 1);
INSERT INTO muchung.recommend (id, created_at, modified_at, base_time, reason, title, member_id) VALUES (11, '2024-02-15 06:42:01', '2024-02-15 06:42:01', '2024-02-15', '친구들과 함께 시간을 보내면 행복감과 사회적 연결감을 느낄 수 있어요. 윌리웡카 영화에서 친구들과 함께 하는 모습이 당신에게 영감을 준 것 같아요.', '친구와 약속 잡기', 1);
INSERT INTO muchung.recommend (id, created_at, modified_at, base_time, reason, title, member_id) VALUES (12, '2024-02-15 06:42:01', '2024-02-15 06:42:01', '2024-02-15', '새로운 취미를 시작하면 새로운 도전과 자기 계발의 기회를 얻을 수 있어요. 책을 읽는 것처럼, 다른 활동을 통해 자신을 발전시킬 수 있습니다.', '새로운 취미 시작하기', 1);
INSERT INTO muchung.recommend (id, created_at, modified_at, base_time, reason, title, member_id) VALUES (13, '2024-02-15 13:00:21', '2024-02-15 13:00:21', '2024-02-15', '개발에 집중하고자 할 때, 일정을 조정하면 시간을 확보할 수 있어요.', '미리 개발 일정을 조정하기', 1);
INSERT INTO muchung.recommend (id, created_at, modified_at, base_time, reason, title, member_id) VALUES (14, '2024-02-15 13:00:21', '2024-02-15 13:00:21', '2024-02-15', '오늘은 다른 사건들로 인해 계획이 변경되었으니, 내일은 자신만의 시간을 만들어서 원하는 활동에 집중할 수 있어요.', '자신만의 시간을 만들기', 1);
INSERT INTO muchung.recommend (id, created_at, modified_at, base_time, reason, title, member_id) VALUES (15, '2024-02-15 13:00:21', '2024-02-15 13:00:21', '2024-02-15', '오늘은 활동들을 하지 못했으니, 내일은 몸을 움직여서 건강을 챙기는 것도 좋을 것 같아요.', '스트레칭이나 운동을 하기', 1);
INSERT INTO muchung.recommend (id, created_at, modified_at, base_time, reason, title, member_id) VALUES (16, '2024-02-15 17:03:07', '2024-02-15 17:03:07', '2024-02-15', '라이브 방송은 정보를 얻을 수 있는 좋은 방법이야. 내일은 어떤 주제로 라이브 방송을 들을지 생각해보면서 발표 준비도 도와줄 수 있어.', '라이브 방송 듣기', 1);
INSERT INTO muchung.recommend (id, created_at, modified_at, base_time, reason, title, member_id) VALUES (17, '2024-02-15 17:03:07', '2024-02-15 17:03:07', '2024-02-15', '새로운 경험을 통해 기분도 전환할 수 있어. 스타벅스에서 즐길 수 있는 다양한 메뉴를 탐색해보는 것도 좋은 방법이야.', '스타벅스 가서 신메뉴 먹기', 1);
INSERT INTO muchung.recommend (id, created_at, modified_at, base_time, reason, title, member_id) VALUES (18, '2024-02-15 17:03:07', '2024-02-15 17:03:07', '2024-02-15', '소중한 사람과 함께한 시간은 힐링이 될 수 있어. 이현이랑 지에스에서 과자를 사오면서 소소한 행복을 느낄 수 있을 거야.', '지에스에서 이현이 줄 과자 사오기', 1);
INSERT INTO muchung.recommend (id, created_at, modified_at, base_time, reason, title, member_id) VALUES (19, '2024-02-15 17:48:02', '2024-02-15 17:48:02', '2024-02-15', '라이브 방송을 듣으면서 새로운 지식을 얻을 수 있고, 발표 준비에도 도움이 될 것이에요.', '라이브 방송 듣기', 1);
INSERT INTO muchung.recommend (id, created_at, modified_at, base_time, reason, title, member_id) VALUES (20, '2024-02-15 17:48:02', '2024-02-15 17:48:02', '2024-02-15', '스트레스를 풀고 즐거운 시간을 보낼 수 있는 기회가 될 거에요. 또한, 다른 계획들과는 다른 활동을 통해 다양한 경험을 할 수 있어요.', '스타벅스 가서 신메뉴 먹기', 1);
INSERT INTO muchung.recommend (id, created_at, modified_at, base_time, reason, title, member_id) VALUES (21, '2024-02-15 17:48:02', '2024-02-15 17:48:02', '2024-02-15', '시간을 효율적으로 관리하면 다양한 활동들을 더욱 효과적으로 할 수 있을 것이에요. 개발과 발표 준비를 조화롭게 진행할 수 있는 계획을 세워보세요.', '시간 관리 계획 세우기', 1);
INSERT INTO muchung.recommend (id, created_at, modified_at, base_time, reason, title, member_id) VALUES (25, '2024-02-16 01:38:22', '2024-02-16 01:38:22', '2024-02-16', '오늘 운동을 해서 몸이 개운하고 멘탈도 좋아졌잖아. 야외에서 운동하면 신선한 공기를 마시며 활력을 얻을 수 있고, 자연의 풍경을 감상하며 기분도 좋아질 거야.', '야외 운동하기', 5);
INSERT INTO muchung.recommend (id, created_at, modified_at, base_time, reason, title, member_id) VALUES (26, '2024-02-16 01:38:22', '2024-02-16 01:38:22', '2024-02-16', '오늘 건강한 식사를 했으니 내일은 더 다양한 요리에 도전해보는 건 어때? 다른 식재료를 활용해 보다 맛있고 영양가 있는 요리를 만들어봐. 새로운 요리에 도전하면 창의력과 자신감도 향상될 거야.', '새로운 요리 도전하기', 5);
INSERT INTO muchung.recommend (id, created_at, modified_at, base_time, reason, title, member_id) VALUES (27, '2024-02-16 01:38:22', '2024-02-16 01:38:22', '2024-02-16', '스트레칭과 운동을 통해 몸과 마음을 건강하게 유지했잖아. 내일은 명상이나 요가를 해보는 건 어때? 이 활동들은 스트레스를 완화시켜주고 내면의 평화와 안정을 가져다줄 거야.', '명상이나 요가를 해보기', 5);
INSERT INTO muchung.recommend (id, created_at, modified_at, base_time, reason, title, member_id) VALUES (52, '2024-02-16 04:48:06', '2024-02-16 04:48:06', '2024-02-15', '데일 카네기 인간관계론을 읽으며 좋은 인간 관계에 대한 조언을 얻었으니, 내일은 실제로 사람들과 대화를 나누면서 그 조언들을 실천해보는 것은 어떨까요? 사람들과 소통하며 더욱 더 좋은 인간 관계를 형성하고 발전시킬 수 있을 거예요.', '사람들과 대화하기', 17);
INSERT INTO muchung.recommend (id, created_at, modified_at, base_time, reason, title, member_id) VALUES (53, '2024-02-16 04:48:06', '2024-02-16 04:48:06', '2024-02-15', '오늘 경의선 숲길에서 산책한 경험이 좋았으니, 내일은 다른 곳으로 산책을 나가보는 것은 어떨까요? 새로운 경치와 환경을 감상하면서 산책하는 것은 신선한 영감을 주고 마음을 편안하게 해줄 수 있을 거예요.', '다른 곳으로 산책하기', 17);
INSERT INTO muchung.recommend (id, created_at, modified_at, base_time, reason, title, member_id) VALUES (54, '2024-02-16 04:48:06', '2024-02-16 04:48:06', '2024-02-15', '카페 발견에 실패했지만, 내일은 새로운 카페를 찾아보는 것은 어떨까요? 다양한 카페를 방문하면서 맛있는 음료를 즐기며 휴식을 취할 수 있을 거예요. 또한, 다른 사람들을 만나고 대화를 나누는 기회도 생길 수 있어요.', '새로운 카페 찾아보기', 17);


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
create table report
(
    id          bigint auto_increment
        primary key,
    created_at  datetime     null,
    modified_at datetime     null,
    report_date date         not null,
    review      varchar(255) null,
    thumbnail   varchar(255) null comment '썸네일 이미지, 첫 완료 업무',
    member_id   bigint       not null,
    constraint FKel7y5wyx42a6njav1dbe2torl
        foreign key (member_id) references member (id)
);

INSERT INTO muchung.report (id, created_at, modified_at, report_date, review, thumbnail, member_id) VALUES (1, null, null, '2024-02-12', '재밌었다 이거', 'https://t1.daumcdn.net/cfile/tistory/24652E3B56611E942E', 1);
INSERT INTO muchung.report (id, created_at, modified_at, report_date, review, thumbnail, member_id) VALUES (2, null, null, '2024-02-12', '재밌는 하루였습니다.', 'https://nimage.newsway.co.kr/photo/2021/07/22/20210722000015_0700.png', 2);
INSERT INTO muchung.report (id, created_at, modified_at, report_date, review, thumbnail, member_id) VALUES (3, null, null, '2024-02-12', '오늘은 갓생을 살았습니다..\\n 내일도 과연 갓생을 살 수 있을까요?', 'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/4PYj/image/9kZEQ5jYef7BxRXLCPvgzsp9DNU.jpg', 3);
INSERT INTO muchung.report (id, created_at, modified_at, report_date, review, thumbnail, member_id) VALUES (4, null, null, '2024-02-01', '리뷰 데이터 입니다.', 'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg', 1);
INSERT INTO muchung.report (id, created_at, modified_at, report_date, review, thumbnail, member_id) VALUES (5, null, null, '2024-02-02', '리뷰 데이터 입니다.', 'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg', 1);
INSERT INTO muchung.report (id, created_at, modified_at, report_date, review, thumbnail, member_id) VALUES (6, null, null, '2024-02-04', '리뷰 데이터 입니다.', 'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg', 1);
INSERT INTO muchung.report (id, created_at, modified_at, report_date, review, thumbnail, member_id) VALUES (7, null, null, '2024-02-06', '리뷰 데이터 입니다.', 'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg', 1);
INSERT INTO muchung.report (id, created_at, modified_at, report_date, review, thumbnail, member_id) VALUES (8, null, null, '2024-01-15', '리뷰 데이터 입니다.', 'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg', 1);
INSERT INTO muchung.report (id, created_at, modified_at, report_date, review, thumbnail, member_id) VALUES (9, null, null, '2024-01-27', '리뷰 데이터 입니다.', 'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg', 1);
INSERT INTO muchung.report (id, created_at, modified_at, report_date, review, thumbnail, member_id) VALUES (10, null, null, '2024-01-31', '리뷰 데이터 입니다.', 'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg', 1);
INSERT INTO muchung.report (id, created_at, modified_at, report_date, review, thumbnail, member_id) VALUES (13, '2024-02-14 10:39:50', '2024-02-14 10:39:53', '2024-02-14', '보고서 완', 'https://muchung.s3.ap-northeast-2.amazonaws.com/5a75d761-e9f2-490e-b602-4856fe0329fc.PNG', 4);
INSERT INTO muchung.report (id, created_at, modified_at, report_date, review, thumbnail, member_id) VALUES (19, '2024-02-16 02:22:13', '2024-02-16 02:22:13', '2024-02-16', '오늘은 개발 일정을 조정하는 데에 성공하고, 라이브 방송을 듣고 소셜 활동에 참여했습니다.
 개발 일정 조정은 만족스러웠고, 라이브 방송은 좋은 주제였습니다.
 소셜 활동에서는 많은 대화를 나눴습니다.', 'https://muchung.s3.ap-northeast-2.amazonaws.com/02d0c229-1f97-4eef-9f2a-7c9772ff2705.png', 2);
INSERT INTO muchung.report (id, created_at, modified_at, report_date, review, thumbnail, member_id) VALUES (24, '2024-02-16 02:53:14', '2024-02-16 03:05:50', '2024-02-16', '오늘은 운동을 하고 건강한 식사를 하고 스트레칭까지 모두 잘 했다. 
 운동을 하면서 몸이 개운하고 스트레칭을 하면서 시원한 기분을 느꼈다. 
 멘탈이 좋아지는 것을 느낄 수 있었다. 
 내일 더욱 유용한 운동 방법을 찾아보고 새로운 도전을 시도해보기로 했다.', 'https://muchung.s3.ap-northeast-2.amazonaws.com/a74b0c61-cfcc-40ff-b55c-12c5c48928b1.jpeg', 5);
INSERT INTO muchung.report (id, created_at, modified_at, report_date, review, thumbnail, member_id) VALUES (29, '2024-02-16 04:47:52', '2024-02-16 04:47:52', '2024-02-16', '오늘은 데일 카네기 인간관계론을 읽었고, 초반이라 내용이 많이 나오지 않았지만, 좋은 인간 관계에 대한 조언을 얻을 수 있을 거라는 느낌이 들어서 기대돼요. 
 산책을 하러 경의선 숲길에 갔는데, 강아지들을 많이 만나서 즐거웠어요. 
 카페를 찾지 못했지만, 숲길에서의 산책으로 충분했어요.', 'https://muchung.s3.ap-northeast-2.amazonaws.com/f8cd5f49-bb0c-4118-8871-2cec67bcd302.jpg', 17);


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
create table task
(
    id               bigint auto_increment
        primary key,
    created_at       datetime     null,
    modified_at      datetime     null,
    completed_time   datetime     null comment '업무 완료 처리된 날짜',
    completion_image varchar(255) null comment '업무 완료 이미지',
    is_completed     bit          not null comment '업무 완료 여부',
    task_date        date         not null comment '업무 올린 날짜',
    title            varchar(255) not null comment '업무 명',
    member_id        bigint       not null,
    report_id        bigint       null,
    constraint FKqhrntwa4ll5gplvs23bdocep8
        foreign key (report_id) references report (id),
    constraint FKtisaouhsp1pjc613txc886xfh
        foreign key (member_id) references member (id)
);

create index taskDate_index
    on task (task_date);

INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (1, null, null, '2024-02-12 08:00:57', 'https://news.lscns.com/wp-content/uploads/900_2.jpg', true, '2024-02-12', '영업부 지준영님이랑 줌 회의하기', 1, 1);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (4, null, null, '2024-02-12 08:00:57', 'https://t1.daumcdn.net/cfile/tistory/24652E3B56611E942E', true, '2024-02-12', '버킷리스트 작성하기', 1, 1);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (5, null, null, '2024-02-12 08:00:58', 'https://nimage.newsway.co.kr/photo/2021/07/22/20210722000015_0700.png', true, '2024-02-12', '공포영화 감상하기', 2, 2);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (6, null, null, '2024-02-12 08:00:58', 'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/4PYj/image/9kZEQ5jYef7BxRXLCPvgzsp9DNU.jpg', true, '2024-02-12', '자격증 공부 하기', 3, 3);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (7, null, null, '2024-02-12 08:00:58', 'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg', true, '2024-02-01', '카페 공부하기', 1, 4);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (8, null, null, '2024-02-12 08:00:58', 'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg', true, '2024-02-02', '카페 공부하기', 1, 5);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (9, null, null, '2024-02-12 08:00:58', 'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg', true, '2024-02-04', '카페 공부하기', 1, 6);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (10, null, null, '2024-02-12 08:00:58', 'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg', true, '2024-02-01', '카페 공부하기', 1, 7);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (11, null, null, '2024-02-12 08:00:58', 'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg', true, '2024-01-15', '카페 공부하기', 1, 8);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (12, null, null, '2024-02-12 08:00:58', 'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg', true, '2024-01-27', '카페 공부하기', 1, 9);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (13, '2024-02-15 08:44:54', '2024-02-15 09:26:57', '2024-02-15 09:26:57', 'https://muchung.s3.ap-northeast-2.amazonaws.com/6b7aeb4c-2062-4a71-814e-bbe926eb2821.jpg', true, '2024-02-15', '업무1', 2, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (14, '2024-02-15 08:44:57', '2024-02-15 08:44:57', null, null, false, '2024-02-15', '업무 2', 2, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (15, '2024-02-15 08:45:01', '2024-02-15 08:45:01', null, null, false, '2024-02-15', '업무 3', 2, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (16, '2024-02-15 08:45:04', '2024-02-15 08:45:04', null, null, false, '2024-02-15', '업무 4', 2, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (17, '2024-02-15 08:59:56', '2024-02-15 08:59:56', null, null, false, '2024-02-15', '하이하이', 8, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (18, '2024-02-15 09:31:14', '2024-02-15 09:31:14', null, null, false, '2024-02-15', '라이브 방송 듣고 발표 준비하기', 1, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (19, '2024-02-15 09:31:21', '2024-02-15 09:31:21', null, null, false, '2024-02-15', '스타벅스 가서 신메뉴 먹기', 1, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (20, '2024-02-15 09:31:40', '2024-02-15 09:31:40', null, null, false, '2024-02-15', '지에스에서 이현이 줄 과자 사오기', 1, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (35, '2024-02-15 10:08:15', '2024-02-15 10:08:15', null, null, false, '2024-02-15', '빨래하기', 8, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (36, '2024-02-15 10:08:16', '2024-02-15 10:08:16', null, null, false, '2024-02-15', '노래방에서 아이유 노래 부르기', 8, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (42, '2024-02-15 10:26:48', '2024-02-15 10:27:52', '2024-02-15 10:27:52', 'https://muchung.s3.ap-northeast-2.amazonaws.com/75a91662-2428-48e7-9cce-32d7a691210f.PNG', true, '2024-02-15', '밥 먹기', 4, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (43, '2024-02-15 10:27:05', '2024-02-15 10:28:05', '2024-02-15 10:28:05', 'https://muchung.s3.ap-northeast-2.amazonaws.com/5a75d761-e9f2-490e-b602-4856fe0329fc.PNG', true, '2024-02-15', '공부하기', 4, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (44, '2024-02-15 10:27:30', '2024-02-15 10:27:30', null, null, false, '2024-02-15', '프로젝트 마무리하기', 4, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (46, '2024-02-14 10:38:02', '2024-02-14 10:38:09', '2024-02-14 10:38:19', 'https://muchung.s3.ap-northeast-2.amazonaws.com/5a75d761-e9f2-490e-b602-4856fe0329fc.PNG', true, '2024-02-14', '빨래하기', 4, 13);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (69, '2024-02-15 12:44:11', '2024-02-15 12:44:11', null, null, false, '2024-02-15', '빨래하기', 4, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (70, '2024-02-15 12:44:17', '2024-02-15 12:44:17', null, null, false, '2024-02-15', '노래방에서 아이유 노래 부르기', 4, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (71, '2024-02-15 12:44:44', '2024-02-15 12:44:44', null, null, false, '2024-02-15', '점심밥 직접 요리하기', 4, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (111, '2024-02-15 17:13:46', '2024-02-15 17:13:46', null, null, false, '2024-02-15', '지에스에서 이현이 줄 과자 사오기', 5, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (112, '2024-02-15 17:13:59', '2024-02-15 17:13:59', null, null, false, '2024-02-15', '스타벅스 가서 신메뉴 먹기', 5, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (113, '2024-02-15 17:17:17', '2024-02-15 17:17:17', null, null, false, '2024-02-15', '지에스에서 이현이 줄 과자 사오기', 5, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (114, '2024-02-15 17:17:19', '2024-02-15 17:17:19', null, null, false, '2024-02-15', '라이브 방송 듣기', 5, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (115, '2024-02-15 17:17:21', '2024-02-15 17:17:21', null, null, false, '2024-02-15', '독서하기', 5, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (116, '2024-02-15 17:55:26', '2024-02-15 17:55:26', null, null, false, '2024-02-15', '라이브 방송 듣기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (117, '2024-02-15 17:55:27', '2024-02-15 17:55:27', null, null, false, '2024-02-15', '지에스에서 이현이 줄 과자 사오기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (118, '2024-02-15 17:55:56', '2024-02-15 17:55:56', null, null, false, '2024-02-15', '친구와 약속 잡기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (119, '2024-02-15 17:56:01', '2024-02-15 17:56:01', null, null, false, '2024-02-15', '독서하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (120, '2024-02-15 17:58:04', '2024-02-15 17:58:04', null, null, false, '2024-02-15', '운동하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (121, '2024-02-15 17:59:40', '2024-02-15 17:59:40', null, null, false, '2024-02-15', '', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (122, '2024-02-15 18:20:53', '2024-02-15 18:20:53', null, null, false, '2024-02-15', '미리 개발 일정을 조정하기', 5, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (123, '2024-02-15 19:15:14', '2024-02-15 19:15:14', null, null, false, '2024-02-15', '영화보기', 14, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (124, '2024-02-15 19:15:21', '2024-02-15 19:15:21', null, null, false, '2024-02-15', '인사하기', 14, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (125, '2024-02-15 21:16:03', '2024-02-15 21:16:03', null, null, false, '2024-02-15', '산책하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (126, '2024-02-15 21:16:35', '2024-02-15 21:16:35', null, null, false, '2024-02-15', 'ghgfh', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (127, '2024-02-15 23:44:09', '2024-02-15 23:44:09', null, null, false, '2024-02-15', '친구와 약속 잡기', 4, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (128, '2024-02-16 00:03:09', '2024-02-16 01:33:52', '2024-02-16 01:33:52', 'https://muchung.s3.ap-northeast-2.amazonaws.com/a74b0c61-cfcc-40ff-b55c-12c5c48928b1.jpeg', true, '2024-02-16', '운동하기', 5, 24);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (129, '2024-02-16 00:16:39', '2024-02-16 00:16:39', null, null, false, '2024-02-16', '수현이', 4, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (130, '2024-02-16 00:16:42', '2024-02-16 00:16:42', null, null, false, '2024-02-16', '업무', 4, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (133, '2024-02-16 01:02:06', '2024-02-16 01:02:06', null, null, false, '2024-02-16', 'ㄴㄷㄹㄴㄷㄹ', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (134, '2024-02-16 01:23:10', '2024-02-16 01:23:10', null, null, false, '2024-02-16', '되기라도 해라 날 도와주거라', 1, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (135, '2024-02-16 01:31:47', '2024-02-16 01:33:58', '2024-02-16 01:33:58', 'https://muchung.s3.ap-northeast-2.amazonaws.com/0874624e-c016-4d07-8ce1-2c735a98bb70.jpeg', true, '2024-02-16', '건강한 식사하기', 5, 24);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (136, '2024-02-16 01:31:50', '2024-02-16 01:34:14', '2024-02-16 01:34:14', 'https://muchung.s3.ap-northeast-2.amazonaws.com/35bc4bee-efd3-4e71-a4e8-0f4e2b722f03.jpeg', true, '2024-02-16', '스트레칭이나 운동을 하기', 5, 24);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (140, '2024-02-16 01:36:24', '2024-02-16 01:36:24', null, null, false, '2024-02-16', '운동하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (141, '2024-02-16 01:36:25', '2024-02-16 01:36:25', null, null, false, '2024-02-16', '라이브 방송 듣기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (142, '2024-02-16 01:38:22', '2024-02-16 01:38:22', null, null, false, '2024-02-16', '미리 개발 일정을 조정하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (143, '2024-02-16 01:38:41', '2024-02-16 01:38:41', null, null, false, '2024-02-16', '스타벅스 가서 신메뉴 먹기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (144, '2024-02-16 01:46:43', '2024-02-16 01:46:43', null, null, false, '2024-02-16', '운동하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (145, '2024-02-16 01:46:44', '2024-02-16 01:46:44', null, null, false, '2024-02-16', '야외 운동하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (146, '2024-02-16 01:46:44', '2024-02-16 01:46:44', null, null, false, '2024-02-16', '스트레칭이나 운동을 하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (147, '2024-02-16 01:47:04', '2024-02-16 01:47:04', null, null, false, '2024-02-16', '건강한 식사하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (151, '2024-02-16 02:06:23', '2024-02-16 02:06:23', null, null, false, '2024-02-16', '새로운 취미 시작하기', 5, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (152, '2024-02-16 02:06:24', '2024-02-16 02:06:24', null, null, false, '2024-02-16', '독서하기', 5, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (153, '2024-02-16 02:06:24', '2024-02-16 04:56:18', '2024-02-16 04:56:18', 'https://muchung.s3.ap-northeast-2.amazonaws.com/37b4c1be-eaac-44eb-bfef-13f77e9c56ba.jpeg', true, '2024-02-16', '일정을 여유롭게 조절하기', 5, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (154, '2024-02-16 02:07:17', '2024-02-16 02:13:42', '2024-02-16 02:13:42', 'https://muchung.s3.ap-northeast-2.amazonaws.com/02d0c229-1f97-4eef-9f2a-7c9772ff2705.png', true, '2024-02-16', '미리 개발 일정을 조정하기', 2, 19);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (155, '2024-02-16 02:07:47', '2024-02-16 02:07:47', null, null, false, '2024-02-16', '명상이나 요가를 해보기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (156, '2024-02-16 02:07:48', '2024-02-16 02:07:48', null, null, false, '2024-02-16', '명상이나 요가를 해보기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (157, '2024-02-16 02:07:48', '2024-02-16 02:07:48', null, null, false, '2024-02-16', '명상이나 요가를 해보기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (158, '2024-02-16 02:07:49', '2024-02-16 02:07:49', null, null, false, '2024-02-16', '명상이나 요가를 해보기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (159, '2024-02-16 02:07:51', '2024-02-16 02:07:51', null, null, false, '2024-02-16', '명상이나 요가를 해보기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (160, '2024-02-16 02:07:51', '2024-02-16 02:07:51', null, null, false, '2024-02-16', '명상이나 요가를 해보기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (161, '2024-02-16 02:07:51', '2024-02-16 02:07:51', null, null, false, '2024-02-16', '명상이나 요가를 해보기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (162, '2024-02-16 02:07:51', '2024-02-16 02:07:51', null, null, false, '2024-02-16', '명상이나 요가를 해보기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (163, '2024-02-16 02:07:51', '2024-02-16 02:07:51', null, null, false, '2024-02-16', '명상이나 요가를 해보기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (164, '2024-02-16 02:07:52', '2024-02-16 02:07:52', null, null, false, '2024-02-16', '명상이나 요가를 해보기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (165, '2024-02-16 02:07:52', '2024-02-16 02:07:52', null, null, false, '2024-02-16', '라이브 방송 듣기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (166, '2024-02-16 02:07:52', '2024-02-16 02:07:52', null, null, false, '2024-02-16', '라이브 방송 듣기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (167, '2024-02-16 02:07:56', '2024-02-16 02:07:56', null, null, false, '2024-02-16', '명상이나 요가를 해보기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (168, '2024-02-16 02:07:56', '2024-02-16 02:07:56', null, null, false, '2024-02-16', '명상이나 요가를 해보기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (169, '2024-02-16 02:07:56', '2024-02-16 02:07:56', null, null, false, '2024-02-16', '명상이나 요가를 해보기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (170, '2024-02-16 02:07:56', '2024-02-16 02:07:56', null, null, false, '2024-02-16', '명상이나 요가를 해보기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (171, '2024-02-16 02:07:56', '2024-02-16 02:07:56', null, null, false, '2024-02-16', '명상이나 요가를 해보기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (172, '2024-02-16 02:07:56', '2024-02-16 02:07:56', null, null, false, '2024-02-16', '명상이나 요가를 해보기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (173, '2024-02-16 02:08:13', '2024-02-16 02:13:59', '2024-02-16 02:13:59', 'https://muchung.s3.ap-northeast-2.amazonaws.com/9cb442b1-d505-4d75-b1df-9e1f1610a280.jpg', true, '2024-02-16', '라이브 방송 듣기', 2, 19);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (174, '2024-02-16 02:08:17', '2024-02-16 02:15:00', '2024-02-16 02:15:00', 'https://muchung.s3.ap-northeast-2.amazonaws.com/7c9831b8-168b-4897-a3ac-6a74aa65f7c2.jpg', true, '2024-02-16', '소셜 활동 참여하기', 2, 19);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (175, '2024-02-16 02:08:27', '2024-02-16 02:08:27', null, null, false, '2024-02-16', '명상이나 요가를 해보기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (176, '2024-02-16 02:08:56', '2024-02-16 02:08:56', null, null, false, '2024-02-16', '스타벅스 가서 신메뉴 먹기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (177, '2024-02-16 02:08:56', '2024-02-16 02:08:56', null, null, false, '2024-02-16', '스타벅스 가서 신메뉴 먹기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (178, '2024-02-16 02:08:58', '2024-02-16 02:08:58', null, null, false, '2024-02-16', '스타벅스 가서 신메뉴 먹기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (179, '2024-02-16 02:09:00', '2024-02-16 02:09:00', null, null, false, '2024-02-16', '스타벅스 가서 신메뉴 먹기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (180, '2024-02-16 02:09:01', '2024-02-16 02:09:01', null, null, false, '2024-02-16', '스타벅스 가서 신메뉴 먹기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (181, '2024-02-16 02:09:03', '2024-02-16 02:09:03', null, null, false, '2024-02-16', '스타벅스 가서 신메뉴 먹기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (182, '2024-02-16 02:09:05', '2024-02-16 02:09:05', null, null, false, '2024-02-16', '스타벅스 가서 신메뉴 먹기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (183, '2024-02-16 02:09:06', '2024-02-16 02:09:06', null, null, false, '2024-02-16', '스타벅스 가서 신메뉴 먹기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (184, '2024-02-16 02:09:07', '2024-02-16 02:09:07', null, null, false, '2024-02-16', '스타벅스 가서 신메뉴 먹기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (185, '2024-02-16 02:09:08', '2024-02-16 02:09:08', null, null, false, '2024-02-16', '스타벅스 가서 신메뉴 먹기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (186, '2024-02-16 02:09:29', '2024-02-16 02:09:29', null, null, false, '2024-02-16', '스타벅스 가서 신메뉴 먹기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (187, '2024-02-16 02:09:30', '2024-02-16 02:09:30', null, null, false, '2024-02-16', '스타벅스 가서 신메뉴 먹기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (188, '2024-02-16 02:09:58', '2024-02-16 02:09:58', null, null, false, '2024-02-16', '스타벅스 가서 신메뉴 먹기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (189, '2024-02-16 02:09:59', '2024-02-16 02:09:59', null, null, false, '2024-02-16', '스타벅스 가서 신메뉴 먹기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (190, '2024-02-16 02:10:00', '2024-02-16 02:10:00', null, null, false, '2024-02-16', '친구와 약속 잡기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (191, '2024-02-16 02:10:01', '2024-02-16 02:10:01', null, null, false, '2024-02-16', '친구와 약속 잡기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (192, '2024-02-16 02:10:04', '2024-02-16 02:10:04', null, null, false, '2024-02-16', '새로운 취미 시작하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (198, '2024-02-16 02:12:49', '2024-02-16 02:12:49', null, null, false, '2024-02-16', '운동하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (199, '2024-02-16 02:12:50', '2024-02-16 02:12:50', null, null, false, '2024-02-16', '산책하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (200, '2024-02-16 02:13:03', '2024-02-16 02:13:03', null, null, false, '2024-02-16', '새로운 취미 시작하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (201, '2024-02-16 02:13:04', '2024-02-16 02:13:04', null, null, false, '2024-02-16', '운동하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (202, '2024-02-16 02:13:05', '2024-02-16 02:13:05', null, null, false, '2024-02-16', '새로운 취미 찾기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (203, '2024-02-16 02:13:09', '2024-02-16 02:13:09', null, null, false, '2024-02-16', '운동하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (204, '2024-02-16 02:13:09', '2024-02-16 02:13:09', null, null, false, '2024-02-16', '산책하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (205, '2024-02-16 02:13:11', '2024-02-16 02:13:11', null, null, false, '2024-02-16', '스타벅스 가서 신메뉴 먹기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (206, '2024-02-16 02:13:19', '2024-02-16 02:13:19', null, null, false, '2024-02-16', '주제를 정리하고 발표 자료를 준비하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (207, '2024-02-16 02:13:20', '2024-02-16 02:13:20', null, null, false, '2024-02-16', '산책하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (208, '2024-02-16 02:13:47', '2024-02-16 02:13:47', null, null, false, '2024-02-16', '친구와 약속 잡기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (209, '2024-02-16 02:14:14', '2024-02-16 02:14:14', null, null, false, '2024-02-16', '친구와 약속 잡기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (210, '2024-02-16 02:15:27', '2024-02-16 02:15:27', null, null, false, '2024-02-16', '소셜 활동 참여하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (211, '2024-02-16 02:16:18', '2024-02-16 02:16:18', null, null, false, '2024-02-16', '건강한 식사하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (212, '2024-02-16 02:16:39', '2024-02-16 02:16:39', null, null, false, '2024-02-16', '새로운 식당 가보기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (213, '2024-02-16 02:26:05', '2024-02-16 02:26:05', null, null, false, '2024-02-16', '라이브 방송 듣기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (216, '2024-02-16 02:37:56', '2024-02-16 02:37:56', null, null, false, '2024-02-16', '운동하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (219, '2024-02-16 02:37:58', '2024-02-16 02:37:58', null, null, false, '2024-02-16', '새로운 취미 시작하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (221, '2024-02-16 02:38:01', '2024-02-16 02:38:01', null, null, false, '2024-02-16', '미리 개발 일정 계획하기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (228, '2024-02-16 04:16:02', '2024-02-16 05:10:02', '2024-02-16 05:10:02', 'https://muchung.s3.ap-northeast-2.amazonaws.com/315530b6-e9dc-45ed-b709-b07760dd8d13.webp', true, '2024-02-16', '등산을 가보겠습니다.', 2, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (229, '2024-02-16 04:33:33', '2024-02-16 04:33:33', null, null, false, '2024-02-16', '명상이나 요가를 해보기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (230, '2024-02-16 04:33:35', '2024-02-16 04:33:35', null, null, false, '2024-02-16', '시간 관리 계획 세우기', 7, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (231, '2024-02-16 04:35:40', '2024-02-16 04:40:09', null, '<null>', false, '2024-02-16', '운영체제 시험 공부', 17, 29);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (232, '2024-02-16 04:35:45', '2024-02-16 04:40:17', null, '<null>', false, '2024-02-16', '엄마랑 강아지 산책', 17, 29);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (233, '2024-02-16 04:35:50', '2024-02-16 04:35:50', null, null, false, '2024-02-16', '홈플러스 가서 파스타 재료 사오기', 17, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (234, '2024-02-16 04:56:24', '2024-02-16 04:56:24', null, null, false, '2024-02-16', '다른 곳으로 산책하기', 17, null);
INSERT INTO muchung.task (id, created_at, modified_at, completed_time, completion_image, is_completed, task_date, title, member_id, report_id) VALUES (235, '2024-02-16 04:56:26', '2024-02-16 04:56:26', null, null, false, '2024-02-16', '사람들과 대화하기', 17, null);


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

create table attendance
(
    id          bigint auto_increment
        primary key,
    created_at  datetime null,
    modified_at datetime null,
    end_time    datetime null,
    start_time  datetime null,
    member_id   bigint   null,
    constraint FKslaf4mu3eu0gi72u4t9xcsxjd
        foreign key (member_id) references member (id)
);

INSERT INTO muchung.attendance (id, created_at, modified_at, end_time, start_time, member_id) VALUES (10, '2024-02-13 13:07:19', '2024-02-13 13:08:49', '2024-02-13 13:07:03', '2024-02-13 13:07:00', 1);
INSERT INTO muchung.attendance (id, created_at, modified_at, end_time, start_time, member_id) VALUES (11, '2024-02-13 13:08:58', '2024-02-13 13:08:58', null, '2024-02-13 13:08:58', 7);
INSERT INTO muchung.attendance (id, created_at, modified_at, end_time, start_time, member_id) VALUES (12, '2024-02-13 17:37:44', '2024-02-13 17:37:44', null, '2024-02-13 17:37:44', 2);
INSERT INTO muchung.attendance (id, created_at, modified_at, end_time, start_time, member_id) VALUES (13, '2024-02-13 22:24:46', '2024-02-13 22:24:46', null, '2024-02-13 22:24:46', 5);
INSERT INTO muchung.attendance (id, created_at, modified_at, end_time, start_time, member_id) VALUES (14, '2024-02-14 00:03:15', '2024-02-14 00:03:15', null, '2024-02-14 00:03:15', 5);
INSERT INTO muchung.attendance (id, created_at, modified_at, end_time, start_time, member_id) VALUES (15, '2024-02-14 00:18:10', '2024-02-14 00:18:10', null, '2024-02-14 00:18:10', 2);
INSERT INTO muchung.attendance (id, created_at, modified_at, end_time, start_time, member_id) VALUES (16, '2024-02-14 09:26:23', '2024-02-14 09:26:23', null, '2024-02-14 09:26:23', 4);
INSERT INTO muchung.attendance (id, created_at, modified_at, end_time, start_time, member_id) VALUES (17, '2024-02-14 09:26:55', '2024-02-14 09:26:55', null, '2024-02-14 09:26:53', 7);
INSERT INTO muchung.attendance (id, created_at, modified_at, end_time, start_time, member_id) VALUES (18, '2024-02-14 09:33:13', '2024-02-14 09:33:13', null, '2024-02-14 09:33:12', 8);
INSERT INTO muchung.attendance (id, created_at, modified_at, end_time, start_time, member_id) VALUES (19, '2024-02-14 11:54:54', '2024-02-14 11:54:54', null, '2024-02-14 11:54:54', 9);
INSERT INTO muchung.attendance (id, created_at, modified_at, end_time, start_time, member_id) VALUES (20, '2024-02-15 08:47:44', '2024-02-15 08:47:44', null, '2024-02-15 08:47:41', 8);
INSERT INTO muchung.attendance (id, created_at, modified_at, end_time, start_time, member_id) VALUES (21, '2024-02-15 09:02:14', '2024-02-15 09:02:14', null, '2024-02-15 09:02:14', 5);
INSERT INTO muchung.attendance (id, created_at, modified_at, end_time, start_time, member_id) VALUES (22, '2024-02-15 09:04:11', '2024-02-15 09:04:11', null, '2024-02-15 09:04:11', 4);
INSERT INTO muchung.attendance (id, created_at, modified_at, end_time, start_time, member_id) VALUES (23, '2024-02-15 09:04:40', '2024-02-15 09:04:40', null, '2024-02-15 09:04:37', 7);
INSERT INTO muchung.attendance (id, created_at, modified_at, end_time, start_time, member_id) VALUES (25, '2024-02-15 19:15:04', '2024-02-15 19:15:04', null, '2024-02-15 19:15:02', 14);
INSERT INTO muchung.attendance (id, created_at, modified_at, end_time, start_time, member_id) VALUES (26, '2024-02-16 00:12:23', '2024-02-16 00:12:23', null, '2024-02-16 00:12:23', 4);
INSERT INTO muchung.attendance (id, created_at, modified_at, end_time, start_time, member_id) VALUES (27, '2024-02-16 02:39:58', '2024-02-16 02:39:58', null, '2024-02-16 02:39:58', 7);
INSERT INTO muchung.attendance (id, created_at, modified_at, end_time, start_time, member_id) VALUES (28, '2024-02-16 04:33:03', '2024-02-16 04:33:03', null, '2024-02-16 04:33:03', 7);

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
create table comment
(
    id          bigint auto_increment
        primary key,
    created_at  datetime     null,
    modified_at datetime     null,
    content     varchar(255) null,
    member_id   bigint       null,
    report_id   bigint       null,
    constraint FKmrrrpi513ssu63i2783jyiv9m
        foreign key (member_id) references member (id),
    constraint FKn2m8whrfw1drq2c67d247br7c
        foreign key (report_id) references report (id)
);

INSERT INTO muchung.comment (id, created_at, modified_at, content, member_id, report_id) VALUES (8, '2024-02-13 10:39:19', '2024-02-13 10:39:19', '댓글 되나요?
', 1, 2);
INSERT INTO muchung.comment (id, created_at, modified_at, content, member_id, report_id) VALUES (9, '2024-02-13 12:47:24', '2024-02-13 14:01:05', '안녕하세요 저는 김태훈입니다. ㅋ 수정 개 잘 됨zzzzz', 1, 1);
INSERT INTO muchung.comment (id, created_at, modified_at, content, member_id, report_id) VALUES (20, '2024-02-13 14:50:22', '2024-02-13 14:52:32', '와 무섭다 ㄷㄷ123', 1, 2);
INSERT INTO muchung.comment (id, created_at, modified_at, content, member_id, report_id) VALUES (23, '2024-02-13 15:24:34', '2024-02-13 15:24:34', 'ㅋㅋㅋㅋㅋ????', 8, 1);
INSERT INTO muchung.comment (id, created_at, modified_at, content, member_id, report_id) VALUES (30, '2024-02-13 15:50:54', '2024-02-15 09:27:01', '만족만족 댓글기능', 5, 1);
INSERT INTO muchung.comment (id, created_at, modified_at, content, member_id, report_id) VALUES (33, '2024-02-13 16:19:43', '2024-02-13 16:19:43', '이현진입니다', 5, 5);
INSERT INTO muchung.comment (id, created_at, modified_at, content, member_id, report_id) VALUES (44, '2024-02-13 22:53:27', '2024-02-13 22:53:27', '갓생을 꼭 살아야 할까요?', 5, 3);
INSERT INTO muchung.comment (id, created_at, modified_at, content, member_id, report_id) VALUES (50, '2024-02-13 23:33:53', '2024-02-13 23:33:53', '정말 무섭네요...', 5, 2);
INSERT INTO muchung.comment (id, created_at, modified_at, content, member_id, report_id) VALUES (52, '2024-02-15 09:03:55', '2024-02-15 09:03:55', 'ㅋㅋㅋ', 5, 1);
INSERT INTO muchung.comment (id, created_at, modified_at, content, member_id, report_id) VALUES (65, '2024-02-15 21:48:43', '2024-02-16 04:59:38', '빨래가 은근 어려운데 잘하셨네요', 5, 13);
INSERT INTO muchung.comment (id, created_at, modified_at, content, member_id, report_id) VALUES (74, '2024-02-16 04:18:23', '2024-02-16 04:18:23', '너무 좋아요', 7, 19);
INSERT INTO muchung.comment (id, created_at, modified_at, content, member_id, report_id) VALUES (75, '2024-02-16 04:33:32', '2024-02-16 04:33:32', '건강한 삶을 살아갑시다', 2, 24);
INSERT INTO muchung.comment (id, created_at, modified_at, content, member_id, report_id) VALUES (76, '2024-02-16 04:47:01', '2024-02-16 04:47:01', '탁월한 선택입니다', 2, 19);
INSERT INTO muchung.comment (id, created_at, modified_at, content, member_id, report_id) VALUES (79, '2024-02-16 04:52:11', '2024-02-16 04:52:11', '많은 대화를 나눴다니, 멋있어요! 앞으로 더 응원해요 ><', 17, 19);
INSERT INTO muchung.comment (id, created_at, modified_at, content, member_id, report_id) VALUES (80, '2024-02-16 04:58:04', '2024-02-16 04:58:53', '소셜 봉사 활동을 하셨군요.
 재밌었을 것 같아요. 
나중에 같이 연탄 날러요~', 5, 19);
INSERT INTO muchung.comment (id, created_at, modified_at, content, member_id, report_id) VALUES (81, '2024-02-16 04:59:11', '2024-02-16 04:59:11', '감사합니다 ㅎㅎ', 5, 24);


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
create table department
(
    id          bigint auto_increment
        primary key,
    created_at  datetime     null,
    modified_at datetime     null,
    name        varchar(255) not null
);

INSERT INTO muchung.department (id, created_at, modified_at, name) VALUES (1, '2024-01-15 21:54:05', '2024-01-15 21:54:05', '영업부');
INSERT INTO muchung.department (id, created_at, modified_at, name) VALUES (2, '2024-01-15 21:54:05', '2024-01-15 21:54:05', '개발부');
INSERT INTO muchung.department (id, created_at, modified_at, name) VALUES (3, '2024-01-15 21:54:05', '2024-01-15 21:54:05', '기획부');
INSERT INTO muchung.department (id, created_at, modified_at, name) VALUES (4, '2024-01-15 21:54:05', '2024-01-15 21:54:05', '임원');
INSERT INTO muchung.department (id, created_at, modified_at, name) VALUES (5, '2024-01-15 21:54:05', '2024-01-15 21:54:05', '영업부');


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
create table hello
(
    id          bigint       not null
        primary key,
    created_at  datetime     null,
    modified_at datetime     null,
    message     varchar(255) null
);



------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
create table hibernate_sequence
(
    next_val bigint null
);

INSERT INTO muchung.hibernate_sequence (next_val) VALUES (1);
INSERT INTO muchung.hibernate_sequence (next_val) VALUES (1);
INSERT INTO muchung.hibernate_sequence (next_val) VALUES (1);
INSERT INTO muchung.hibernate_sequence (next_val) VALUES (1);
INSERT INTO muchung.hibernate_sequence (next_val) VALUES (1);
INSERT INTO muchung.hibernate_sequence (next_val) VALUES (1);
INSERT INTO muchung.hibernate_sequence (next_val) VALUES (1);
INSERT INTO muchung.hibernate_sequence (next_val) VALUES (1);
INSERT INTO muchung.hibernate_sequence (next_val) VALUES (1);
INSERT INTO muchung.hibernate_sequence (next_val) VALUES (1);
INSERT INTO muchung.hibernate_sequence (next_val) VALUES (1);
INSERT INTO muchung.hibernate_sequence (next_val) VALUES (1);
INSERT INTO muchung.hibernate_sequence (next_val) VALUES (1);
INSERT INTO muchung.hibernate_sequence (next_val) VALUES (1);
INSERT INTO muchung.hibernate_sequence (next_val) VALUES (1);
INSERT INTO muchung.hibernate_sequence (next_val) VALUES (1);
INSERT INTO muchung.hibernate_sequence (next_val) VALUES (1);
INSERT INTO muchung.hibernate_sequence (next_val) VALUES (1);
INSERT INTO muchung.hibernate_sequence (next_val) VALUES (1);
INSERT INTO muchung.hibernate_sequence (next_val) VALUES (1);
INSERT INTO muchung.hibernate_sequence (next_val) VALUES (1);


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
create table likes
(
    id          bigint auto_increment
        primary key,
    created_at  datetime null,
    modified_at datetime null,
    member_id   bigint   not null,
    report_id   bigint   not null,
    constraint FKa4vkf1skcfu5r6o5gfb5jf295
        foreign key (member_id) references member (id),
    constraint FKfjvximpaiwkebudsf80rb6e6t
        foreign key (report_id) references report (id)
);

INSERT INTO muchung.likes (id, created_at, modified_at, member_id, report_id) VALUES (5, '2024-02-13 14:30:38', '2024-02-13 14:30:38', 1, 1);
INSERT INTO muchung.likes (id, created_at, modified_at, member_id, report_id) VALUES (8, '2024-02-13 14:31:00', '2024-02-13 14:31:00', 1, 7);
INSERT INTO muchung.likes (id, created_at, modified_at, member_id, report_id) VALUES (9, '2024-02-13 14:31:04', '2024-02-13 14:31:04', 1, 6);
INSERT INTO muchung.likes (id, created_at, modified_at, member_id, report_id) VALUES (10, '2024-02-13 14:31:06', '2024-02-13 14:31:06', 1, 5);
INSERT INTO muchung.likes (id, created_at, modified_at, member_id, report_id) VALUES (13, '2024-02-13 15:24:40', '2024-02-13 15:24:40', 8, 1);
INSERT INTO muchung.likes (id, created_at, modified_at, member_id, report_id) VALUES (16, '2024-02-13 15:56:32', '2024-02-13 15:56:32', 5, 3);
INSERT INTO muchung.likes (id, created_at, modified_at, member_id, report_id) VALUES (17, '2024-02-13 15:56:34', '2024-02-13 15:56:34', 5, 6);
INSERT INTO muchung.likes (id, created_at, modified_at, member_id, report_id) VALUES (18, '2024-02-13 15:56:36', '2024-02-13 15:56:36', 5, 5);
INSERT INTO muchung.likes (id, created_at, modified_at, member_id, report_id) VALUES (19, '2024-02-13 15:56:38', '2024-02-13 15:56:38', 5, 9);
INSERT INTO muchung.likes (id, created_at, modified_at, member_id, report_id) VALUES (23, '2024-02-13 16:19:35', '2024-02-13 16:19:35', 5, 2);
INSERT INTO muchung.likes (id, created_at, modified_at, member_id, report_id) VALUES (26, '2024-02-15 21:48:33', '2024-02-15 21:48:33', 5, 13);
INSERT INTO muchung.likes (id, created_at, modified_at, member_id, report_id) VALUES (29, '2024-02-16 04:18:14', '2024-02-16 04:18:14', 7, 19);
INSERT INTO muchung.likes (id, created_at, modified_at, member_id, report_id) VALUES (30, '2024-02-16 04:33:33', '2024-02-16 04:33:33', 2, 24);
INSERT INTO muchung.likes (id, created_at, modified_at, member_id, report_id) VALUES (31, '2024-02-16 04:46:59', '2024-02-16 04:46:59', 2, 19);
INSERT INTO muchung.likes (id, created_at, modified_at, member_id, report_id) VALUES (32, '2024-02-16 04:52:12', '2024-02-16 04:52:12', 17, 19);
INSERT INTO muchung.likes (id, created_at, modified_at, member_id, report_id) VALUES (33, '2024-02-16 04:52:19', '2024-02-16 04:52:19', 17, 24);
INSERT INTO muchung.likes (id, created_at, modified_at, member_id, report_id) VALUES (34, '2024-02-16 04:59:00', '2024-02-16 04:59:00', 5, 19);
INSERT INTO muchung.likes (id, created_at, modified_at, member_id, report_id) VALUES (35, '2024-02-16 04:59:04', '2024-02-16 04:59:04', 5, 24);
INSERT INTO muchung.likes (id, created_at, modified_at, member_id, report_id) VALUES (36, '2024-02-16 04:59:26', '2024-02-16 04:59:26', 5, 29);


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
create table mail
(
    id          bigint auto_increment
        primary key,
    created_at  datetime     null,
    modified_at datetime     null,
    content     longtext     not null comment '내용',
    interest    bit          not null comment '관심',
    is_deleted  bit          not null comment '삭제 여부',
    is_read     bit          not null comment '열람 여부',
    sent_time   datetime     not null comment '발신 시간',
    title       varchar(255) not null comment '제목',
    receiver_id bigint       not null,
    sender_id   bigint       not null,
    constraint FKdinprcealsuy6ndqoab6xdwx4
        foreign key (sender_id) references member (id),
    constraint FKnkqao9xikcx0w6vuqwf1xot9
        foreign key (receiver_id) references member (id)
);

INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (1, null, '2024-02-12 18:24:24', 'A', false, true, true, '2024-02-12 08:00:58', '111', 1, 2);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (2, null, '2024-02-13 01:03:44', 'B', true, true, false, '2024-02-12 08:00:59', '222', 1, 3);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (3, null, '2024-02-12 21:45:13', 'C', false, true, true, '2024-02-12 08:00:59', '333', 2, 1);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (4, null, null, 'D', true, false, false, '2024-02-12 08:00:59', '444', 3, 1);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (5, null, '2024-02-16 00:51:22', 'E', false, false, true, '2024-02-12 08:00:59', '555', 2, 3);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (6, '2024-02-12 17:01:35', '2024-02-13 12:41:12', '테스트입니다', false, true, true, '2024-02-12 17:01:35', '안녕하세요22', 1, 1);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (7, '2024-02-12 17:03:34', '2024-02-12 17:03:34', '테스트입니다', false, false, true, '2024-02-12 17:03:34', '안녕하세요22', 4, 1);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (18, '2024-02-13 10:17:32', '2024-02-13 10:17:32', '내용입니다.', false, false, true, '2024-02-13 10:17:32', '제목입니다.', 4, 1);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (19, '2024-02-13 10:21:16', '2024-02-13 10:21:16', '내용입니다.', false, false, true, '2024-02-13 10:21:16', '메일보내요오.', 4, 1);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (20, '2024-02-13 12:43:17', '2024-02-13 12:43:17', '<p>재열아 안녕..</p>', false, false, true, '2024-02-13 12:43:17', '반가워 재열아..', 5, 1);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (21, '2024-02-15 09:13:50', '2024-02-15 14:47:02', '<p>------------------------------------------------------------Copyright@2033 무업청년들. ALL RIGHTS RESERVED.</p>', false, true, true, '2024-02-15 09:13:50', 'ㄴ', 7, 7);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (22, '2024-02-15 14:47:15', '2024-02-15 14:47:15', '<p>------------------------------------------------------------Copyright@2033 무업청년들. ALL RIGHTS RESERVED.</p>', false, false, true, '2024-02-15 14:47:15', 'rserser', 7, 7);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (23, '2024-02-15 17:10:02', '2024-02-15 17:10:02', '<p>------------------------------------------------------------Copyright@2033 무업청년들. ALL RIGHTS RESERVED.</p>', false, false, true, '2024-02-15 17:10:02', 'ㄴ', 7, 7);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (24, '2024-02-15 17:35:16', '2024-02-15 17:35:16', '<p>------------------------------------------------------------Copyright@2033 무업청년들. ALL RIGHTS RESERVED.</p>', false, false, true, '2024-02-15 17:35:16', 'sㄴ', 7, 7);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (25, '2024-02-15 17:38:55', '2024-02-15 17:38:55', '<p>------------------------------------------------------------Copyright@2033 무sss업청년들. ALL RIGHTS RESERVED.</p>', false, false, true, '2024-02-15 17:38:55', 's', 7, 7);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (26, '2024-02-15 21:17:08', '2024-02-15 21:17:08', '<p>------------------------------------------------------------Copyright@2033 무업청년들. ALL RIGHTS RESERVED.sefsef</p>', false, false, true, '2024-02-15 21:17:08', 'aswf', 7, 7);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (27, '2024-02-15 21:17:47', '2024-02-15 21:17:47', '<h1>------------------------------------------------------------Copyright@2033 무업청년들. ALL RIGHTS RESERVED.</h1>', false, false, true, '2024-02-15 21:17:47', 'saefawfa', 7, 7);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (28, '2024-02-15 21:23:27', '2024-02-15 21:23:27', '<p>------------------------------------------------------------Copyright@2033 무업청년들. ALL RIGHTS RESERVED.</p>', false, false, true, '2024-02-15 21:23:27', 's', 7, 7);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (29, '2024-02-15 21:26:22', '2024-02-15 21:26:22', '<p>------------------------------------------------------------Copyright@2033 무업청년들. ALL RIGHTS RESERVED.</p>', false, false, true, '2024-02-15 21:26:22', 's', 7, 7);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (30, '2024-02-15 21:27:59', '2024-02-15 21:27:59', '<p>------------------------------------------------------------Copyright@2033 무업청년들. ALL RIGHTS RESERVED.</p>', false, false, true, '2024-02-15 21:27:59', 'aasdawsd', 7, 7);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (31, '2024-02-16 03:25:07', '2024-02-16 05:08:45', '<p>------------------------------------------------------------Copyright@2033 무업청년들. ALL RIGHTS RESERVED.</p><p><br></p><p>함께해요!</p>', false, true, true, '2024-02-16 03:25:07', '함께해요', 8, 2);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (32, '2024-02-16 04:16:32', '2024-02-16 05:59:17', '<p>------------------------------------------------------------Copyright@2033 무업청년들. ALL RIGHTS RESERVED.</p><p><br></p><p><br></p><p>반갑습니다.</p>', false, true, true, '2024-02-16 04:16:32', '안녕하세요 연락드립니다.', 8, 5);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (33, '2024-02-16 04:19:12', '2024-02-16 04:19:12', '<p>------------------------------------------------------------Copyright@2033 무업청년들. ALL RIGHTS RESERVED.</p>', false, false, true, '2024-02-16 04:19:12', '안녕하세요', 7, 7);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (34, '2024-02-16 04:32:34', '2024-02-16 04:32:34', '<p>아녕</p><p><br></p><p>------------------------------------------------------------Copyright@2033 무업청년들. ALL RIGHTS RESERVED.</p>', false, false, true, '2024-02-16 04:32:34', 'ㅎㅇㅎㅇ', 10, 5);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (35, '2024-02-16 05:08:32', '2024-02-16 05:08:32', '<p><br></p><p>안녕하세요</p><p><br></p><p><br></p><p><br></p><p><br></p><p>--------------------------------------------------------------------------Copyright@2033 무업청년들. ALL RIGHTS RESERVED.</p>', false, false, true, '2024-02-16 05:08:32', '안녕하세요', 5, 2);
INSERT INTO muchung.mail (id, created_at, modified_at, content, interest, is_deleted, is_read, sent_time, title, receiver_id, sender_id) VALUES (36, '2024-02-16 05:59:07', '2024-02-16 05:59:07', '<p>준영씨 오랜만이에요 ㅎ</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p>--------------------------------------------------------------------------Copyright@2033 무업청년들. ALL RIGHTS RESERVED.</p>', false, false, true, '2024-02-16 05:59:07', '안녕하세요 메일 보냅니다.', 8, 5);


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------















