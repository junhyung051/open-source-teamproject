# Docker로 실행
---

docker-compose up --build

**REST API 명세**
---

# 1. 회원가입
- **POST** `/api/register/`
- **Request**
    ```json
    {
      "username": "아이디",
      "real_name": "실명",
      "password_hash": "비밀번호(해시)",
      "region": "지역(선택)"
    }
    ```
- **Response**
    ```json
    { "user_id": 1 }
    ```

---

# 2. 로그인
- **POST** `/api/login/`
- **Request**
    ```json
    { "username": "아이디", "password_hash": "비밀번호(해시)" }
    ```
- **Response(성공)**
    ```json
    { "user_id": 1, "real_name": "홍길동" }
    ```
- **Response(실패)**
    ```json
    { "error": "로그인 실패" }
    ```

---

# 3. 스터디 모집글 등록
- **POST** `/api/study/create/`
- **Request**
    ```json
    {
      "user_id": 1,
      "title": "스터디 제목",
      "region": "서울",
      "meet_time": "2025-07-10T19:00:00Z",
      "description": "상세 설명",
      "max_participants": 5
    }
    ```
- **Response**
    ```json
    { "post_id": 10 }
    ```

---

# 4. 스터디 목록/검색
- **GET** `/api/study/search/?keyword=파이썬&region=서울&date_from=2025-07-01&date_to=2025-07-31`
- **Response**
    ```json
    [
      {
        "id": 10,
        "title": "파이썬 기초 스터디",
        "region": "서울",
        "meet_time": "2025-07-10T19:00:00Z",
        "description": "입문자 환영",
        "max_participants": 5,
        "created_at": "2025-07-05T09:00:00Z"
      }
    ]
    ```

---

# 5. 스터디 신청
- **POST** `/api/study/apply/`
- **Request**
    ```json
    { "user_id": 1, "post_id": 10 }
    ```
- **Response(성공)**
    ```json
    { "result": "신청 완료!" }
    ```
- **Response(실패)**
    ```json
    { "result": "이미 신청한 스터디입니다." }
    { "result": "모집이 마감되었습니다." }
    ```

---

# 6. 스터디 신청 취소
- **POST** `/api/study/cancel/`
- **Request**
    ```json
    { "user_id": 1, "post_id": 10 }
    ```
- **Response**
    ```json
    { "result": "취소 완료!" }
    ```
    (혹은 에러 메시지 반환)

---

# 7. 후기 작성
- **POST** `/api/study/review/`
- **Request**
    ```json
    { "user_id": 1, "post_id": 10, "review_text": "정말 유익한 스터디!" }
    ```
- **Response**
    ```json
    { "result": "후기 작성 완료!" }
    ```

---

# 8. 남은 인원 확인
- **GET** `/api/study/remaining_slots/10/`
- **Response**
    ```json
    { "remaining_slots": 2 }
    ```

---

# 9. 남은 시간 확인
- **GET** `/api/study/time_left/10/`
- **Response**
    ```json
    { "time_left": "1 day, 5:03:20" }
    ```

---
