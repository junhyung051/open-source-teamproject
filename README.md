# 스터디 대시보드 React 웹 애플리케이션

피그마 디자인을 기반으로 제작된 React 스터디 관리 대시보드 웹 애플리케이션입니다.

## 🎨 디자인 출처
- [Figma 디자인 링크](https://www.figma.com/design/6yWVmgUFMUZN2sts53MOcR/study?node-id=2-2&t=IIV8v75LIgq66C8u-4)

## 📋 기능

### 🔍 주요 기능
- **사이드바 네비게이션**: 스터디 목록, 스터디 후기, 마이페이지, 설정 메뉴
- **스터디 카드**: 장소, 시간, 참여자 수, 평점, 상태 표시
- **실시간 검색**: 스터디명으로 실시간 검색 필터링
- **좋아요 기능**: React state로 관리되는 북마크 기능
- **상태 관리**: 모집중/마감 상태 동적 표시
- **반응형 디자인**: 다양한 화면 크기 지원

### 🎯 React 기능
- **useState Hook**: 네비게이션, 탭, 검색, 좋아요 상태 관리
- **이벤트 핸들링**: onClick, onChange 이벤트 처리
- **조건부 렌더링**: 상태에 따른 UI 변화
- **동적 클래스**: 활성 상태에 따른 CSS 클래스 변경
- **배열 렌더링**: map 함수를 사용한 동적 목록 생성

## 🚀 설치 및 실행 방법

### 1. 프로젝트 설치
```bash
# 의존성 설치
npm install
```

### 2. 개발 서버 실행
```bash
# 개발 서버 시작
npm start
```
브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속

### 3. 빌드
```bash
# 프로덕션 빌드
npm run build
```

### 4. 테스트
```bash
# 테스트 실행
npm test
```

## 🎨 디자인 시스템

### 색상 팔레트
- **주요 색상**: #1F64FF (파란색)
- **배경색**: #FFFFFF (흰색), #F5F6FA (연한 회색)
- **텍스트**: #000022 (검은색), #AAB2C8 (회색)
- **강조색**: #15D6B3 (초록색), #FFDF6C (노란색)
- **비활성**: #E1E2E9 (회색)

### 폰트
- **Lato**: 제목 및 버튼 (400, 700)
- **Actor**: 일반 텍스트 (400)
- **ADLaM Display**: 숫자 표시 (400)

### 레이아웃
- **사이드바**: 280px 고정 너비
- **카드 간격**: 15px
- **기본 여백**: 40px (좌우), 30px (상하)
- **border-radius**: 8px (카드), 4px (버튼)

## 📱 반응형 지원

- **데스크톱**: 1200px 이상
- **태블릿**: 768px - 1199px
- **모바일**: 768px 미만

## 🔧 기술 스택

- **React 18**: 함수형 컴포넌트 & Hooks
- **JavaScript ES6+**: 최신 JS 문법
- **CSS3**: Flexbox, CSS Grid, 애니메이션
- **Google Fonts**: 웹 폰트
- **Create React App**: React 개발 환경

## 📂 파일 구조

```
study-dashboard/
├── public/
│   └── index.html          # HTML 템플릿
├── src/
│   ├── App.js              # 메인 React 컴포넌트
│   ├── index.js            # React 진입점
│   └── index.css           # 전역 스타일
├── package.json            # 의존성 관리
└── README.md              # 프로젝트 설명서
```

## 🎮 사용법

### 네비게이션
- 왼쪽 사이드바에서 메뉴 항목 클릭으로 활성 상태 전환
- "스터디 개설하기" 버튼으로 새 스터디 생성 알림

### 스터디 관리
- 검색창에서 실시간 스터디 검색
- 하트 아이콘 클릭으로 좋아요 토글 (React state 관리)
- "참여하기" 버튼으로 스터디 참여 신청
- 탭 클릭으로 활성 탭 전환

### React 상태 관리
- **activeNav**: 현재 활성 네비게이션 메뉴
- **activeTab**: 현재 활성 탭 (Upcoming/Comment)
- **searchTerm**: 검색어 상태
- **favorites**: Set 객체로 관리되는 좋아요 목록

## 🔄 업데이트 내역

- **v2.0.0**: React 버전 출시
  - React 18로 완전 리팩토링
  - useState Hook으로 상태 관리
  - 함수형 컴포넌트 구조
  - 실시간 검색 기능 향상
  - 이벤트 핸들링 최적화

- **v1.0.0**: 초기 버전 (HTML/CSS/JS)
  - 피그마 디자인 완전 구현
  - 기본 상호작용 기능 추가
  - 반응형 디자인 적용

## 🧩 React 컴포넌트 구조

### App.js 주요 상태
```javascript
const [activeNav, setActiveNav] = useState('스터디 목록');
const [activeTab, setActiveTab] = useState('Upcoming');
const [searchTerm, setSearchTerm] = useState('');
const [favorites, setFavorites] = useState(new Set([0, 2, 3]));
```

### 주요 이벤트 핸들러
- `handleNavClick`: 네비게이션 메뉴 클릭
- `handleTabClick`: 탭 전환
- `handleSearchChange`: 검색어 변경
- `handleHeartClick`: 좋아요 토글
- `handleJoinClick`: 스터디 참여

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새 기능 브랜치를 생성합니다 (`git checkout -b feature/새기능`)
3. 변경사항을 커밋합니다 (`git commit -am '새 기능 추가'`)
4. 브랜치에 푸시합니다 (`git push origin feature/새기능`)
5. Pull Request를 생성합니다

---

💡 **개발 팁**: 
- React DevTools 확장 프로그램으로 state 변화 디버깅 가능
- `npm start`로 Hot Reload 개발 환경 활용
- CSS 변경사항도 실시간 반영됨 