insert into department(NAME)
values ('영업부');

insert into department(NAME)
values ('개발부');

insert into department(NAME)
values ('기획부');

INSERT INTO MEMBER(EMAIL, NAME, PHONE, DESCRIPTION, STATUS, PROFILE_IMAGE, DEPARTMENT_ID, CREATED_AT)
VALUES ('muchung@kakao.com', '김태훈', '010-1234-1234', '소개입니다', 'NCS',
        'https://media.bunjang.co.kr/product/230780895_1_1690030737_w360.jpg', 3, now());

INSERT INTO MEMBER(EMAIL, NAME, PHONE, PROFILE_IMAGE)
VALUES ('muchung@kakao.com', '이수현', '010-1234-1234',
        'https://th.bing.com/th/id/OIP.SxkGOsuZ9nMfewd_IVDZmwHaEj?rs=1&pid=ImgDetMain');

INSERT INTO MEMBER(EMAIL, NAME, PHONE, PROFILE_IMAGE)
VALUES ('muchung@kakao.com', '지준영', '010-1234-1234',
        'https://image.cine21.com/resize/cine21/person/2024/0102/14_28_32__65939f00a5a58[X252,310].jpg');

--- member end

insert into report (ID, REPORT_DATE, REVIEW, THUMBNAIL, MEMBER_ID)
values (1, now(), '재밌었다 이거', 'https://t1.daumcdn.net/cfile/tistory/24652E3B56611E942E', 1);

insert into task (MEMBER_ID, TITLE, TASK_DATE, IS_COMPLETED, REPORT_ID)
values (1, '영업부 지준영님이랑 줌 회의하기', now(), false, 1);

insert into task (MEMBER_ID, TITLE, TASK_DATE, IS_COMPLETED, REPORT_ID)
values (1, '연간 계획표 작성하고 리뷰요청하기', now(), false, 1);

insert into task (MEMBER_ID, TITLE, TASK_DATE, IS_COMPLETED)
values (1, '점심 저녁 메뉴 정하고 팀에 보고하기', now(), false);

insert into task (MEMBER_ID, TITLE, TASK_DATE, IS_COMPLETED, COMPLETION_IMAGE, COMPLETED_TIME, REPORT_ID)
values (1, '버킷리스트 작성하기', now(), true, 'https://t1.daumcdn.net/cfile/tistory/24652E3B56611E942E', now(), 1);

-- report and task
insert into report (ID, REPORT_DATE, REVIEW, THUMBNAIL, MEMBER_ID)
values (2, now(), '재밌는 하루였습니다.', 'https://nimage.newsway.co.kr/photo/2021/07/22/20210722000015_0700.png', 2);

insert into task (MEMBER_ID, TITLE, TASK_DATE, IS_COMPLETED, COMPLETION_IMAGE, COMPLETED_TIME, REPORT_ID)
values (2, '공포영화 감상하기', now(), true, 'https://nimage.newsway.co.kr/photo/2021/07/22/20210722000015_0700.png', now(), 2);

-- 2
insert into report (ID, REPORT_DATE, REVIEW, THUMBNAIL, MEMBER_ID)
values (3, now(), '오늘은 갓생을 살았습니다..',
        'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/4PYj/image/9kZEQ5jYef7BxRXLCPvgzsp9DNU.jpg',
        3);

insert into task (MEMBER_ID, TITLE, TASK_DATE, IS_COMPLETED, COMPLETION_IMAGE, COMPLETED_TIME, REPORT_ID)
values (3, '자격증 공부 하기', now(), true,
        'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/4PYj/image/9kZEQ5jYef7BxRXLCPvgzsp9DNU.jpg',
        now(), 3);

-- report comment
insert into comment (MEMBER_ID, REPORT_ID, CONTENT, CREATED_AT)
values (1, 1, '댓글 누가 남겼나요?', now());

insert into comment (MEMBER_ID, REPORT_ID, CONTENT, CREATED_AT)
values (2, 1, '무청컴퍼니의 점심시간 언젠가요?', now());

insert into comment (MEMBER_ID, REPORT_ID, CONTENT, CREATED_AT)
values (3, 1, '댓글이 잘 보이는지 궁금합니다. 무청컴퍼니 여러분', now());


-- report copy 4번부터
insert into report (ID, REPORT_DATE, REVIEW, THUMBNAIL, MEMBER_ID)
values (4, '2024-02-01', '리뷰 데이터 입니다.',
        'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg',
        1);

insert into task (MEMBER_ID, TITLE, TASK_DATE, IS_COMPLETED, COMPLETION_IMAGE, COMPLETED_TIME, REPORT_ID)
values (1, '카페 공부하기', '2024-02-01', true,
        'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg',
        now(), 4);

insert into report (ID, REPORT_DATE, REVIEW, THUMBNAIL, MEMBER_ID)
values (5, '2024-02-02', '리뷰 데이터 입니다.',
        'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg',
        1);

insert into task (MEMBER_ID, TITLE, TASK_DATE, IS_COMPLETED, COMPLETION_IMAGE, COMPLETED_TIME, REPORT_ID)
values (1, '카페 공부하기', '2024-02-02', true,
        'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg',
        now(), 5);

insert into report (ID, REPORT_DATE, REVIEW, THUMBNAIL, MEMBER_ID)
values (6, '2024-02-04', '리뷰 데이터 입니다.',
        'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg',
        1);

insert into task (MEMBER_ID, TITLE, TASK_DATE, IS_COMPLETED, COMPLETION_IMAGE, COMPLETED_TIME, REPORT_ID)
values (1, '카페 공부하기', '2024-02-04', true,
        'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg',
        now(), 6);

insert into report (ID, REPORT_DATE, REVIEW, THUMBNAIL, MEMBER_ID)
values (7, '2024-02-06', '리뷰 데이터 입니다.',
        'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg',
        1);

insert into task (MEMBER_ID, TITLE, TASK_DATE, IS_COMPLETED, COMPLETION_IMAGE, COMPLETED_TIME, REPORT_ID)
values (1, '카페 공부하기', '2024-02-01', true,
        'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg',
        now(), 7);

insert into report (ID, REPORT_DATE, REVIEW, THUMBNAIL, MEMBER_ID)
values (8, '2024-01-15', '리뷰 데이터 입니다.',
        'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg',
        1);

insert into task (MEMBER_ID, TITLE, TASK_DATE, IS_COMPLETED, COMPLETION_IMAGE, COMPLETED_TIME, REPORT_ID)
values (1, '카페 공부하기', '2024-01-15', true,
        'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg',
        now(), 8);

insert into report (ID, REPORT_DATE, REVIEW, THUMBNAIL, MEMBER_ID)
values (9, '2024-01-27', '리뷰 데이터 입니다.',
        'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg',
        1);

insert into task (MEMBER_ID, TITLE, TASK_DATE, IS_COMPLETED, COMPLETION_IMAGE, COMPLETED_TIME, REPORT_ID)
values (1, '카페 공부하기', '2024-01-27', true,
        'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg',
        now(), 9);

insert into report (ID, REPORT_DATE, REVIEW, THUMBNAIL, MEMBER_ID)
values (10, '2024-01-31', '리뷰 데이터 입니다.',
        'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg',
        1);

insert into task (MEMBER_ID, TITLE, TASK_DATE, IS_COMPLETED, COMPLETION_IMAGE, COMPLETED_TIME, REPORT_ID)
values (1, '카페 공부하기', '2024-01-31', true,
        'https://cdn.news.unn.net/news/photo/202104/508363_308957_29.jpg',
        now(), 10);
