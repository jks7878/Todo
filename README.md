# Todo
할일 목록 서비스의 api입니다

구현 예정 기능
- 유저 검색, 등록, 수정, 삭제
- Todo 등록, 수정, 삭제
- ELK를 사용한 로그 수집 및 시각화

# Issue
2023.02.15 
TODO_ITEM의 REG_USER_ID를 TODO_USER의 USER_SEQ를 FOREIGN KEY로 참조하도록 설정했으나 INSERT API 호출 시에 INSERT 되지 않음에도 불구하고 에러 메시지가 리턴되지 않음
빈 배열로 리턴되는 결과값을 임의의 http status code값을 부여하여 클라이언트에 리턴해주려고 했으나 다른 경우의 수가 예측이 되지 않음 