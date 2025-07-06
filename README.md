# 📚 Study Matching Website

> Django 기반의 스터디 매칭 웹사이트 프로젝트입니다.

## 📁 프로젝트 구조

```bash
open-source-teamproject/
├── study/                # 스터디 관련 앱
│   ├── apps.py           # 앱 설정 파일
│   ├── models.py         # 데이터 모델 정의
│   ├── views.py          # 사용자 요청 처리
│   ├── urls.py           # URL 라우팅
│   └── templates/        # HTML 템플릿 파일
├── studyproject/         # Django 프로젝트 루트
│   ├── settings.py       # 전체 설정
│   ├── urls.py           # 메인 URLconf
│   └── ...
├── db.sqlite3            # 기본 SQLite 데이터베이스
└── manage.py             # 명령어 실행 스크립트

🚀 주요 기능
스터디 개설 및 목록 확인

스터디 참가 신청

참가자 명단 및 상세 정보

후기 작성

관리자 페이지 지원

⚙️ 설치 및 실행 방법
bash
복사
편집
# 1. 저장소 클론
git clone https://github.com/junhyung051/open-source-teamproject.git
cd open-source-teamproject

# 2. 가상환경 설정
python -m venv venv
source venv/bin/activate  # Windows는 venv\Scripts\activate

# 3. 패키지 설치
pip install -r requirements.txt

# 4. 마이그레이션 및 서버 실행
python manage.py migrate
python manage.py runserver
🧰 기술 스택
Python 3.x

Django 4.x

HTML/CSS (템플릿)

SQLite (기본 DB)

📄 라이선스
학교 프로젝트 실습용으로 제작하였습니다.

