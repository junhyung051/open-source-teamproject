import React, { useState } from 'react';

function App() {
  const [activeNav, setActiveNav] = useState('스터디 목록');
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(new Set([0, 2, 3])); // 첫 번째, 세 번째, 네 번째 카드가 좋아요 상태
  const [currentPage, setCurrentPage] = useState('list');
  const [currentUser, setCurrentUser] = useState(null); // 로그인한 사용자 정보
  const [joinedStudies, setJoinedStudies] = useState(new Set()); // 사용자가 참여한 스터디 id 목록
  const [reviews, setReviews] = useState([]); // 후기 배열
  const [reviewTarget, setReviewTarget] = useState(null); // 후기 작성 대상 스터디

  // 초기 스터디 데이터
  const initialStudies = [
    {
      id: 0,
      title: '강남역 9번출구 스타벅스',
      time: '6월 5일 09:30',
      participantsCurrent: 3,
      participantsMax: 6,
      status: 'recruiting',
      statusText: '모집중',
      closed: false,
      creatorId: null
    },
    {
      id: 1,
      title: '홍대입구역 할리스',
      time: '6월 5일 09:45',
      participantsCurrent: 8,
      participantsMax: 8,
      status: 'closed',
      statusText: '마감',
      closed: true,
      creatorId: null
    },
    {
      id: 2,
      title: '건대 라운지커피숍',
      time: '6월 9일 09:30',
      participantsCurrent: 3,
      participantsMax: 6,
      status: 'recruiting',
      statusText: '모집중',
      closed: false,
      creatorId: null
    },
    {
      id: 3,
      title: '영등포역 투썸플레이스',
      time: '6월 8일 09:30',
      participantsCurrent: 3,
      participantsMax: 6,
      status: 'recruiting',
      statusText: '모집중',
      closed: false,
      creatorId: null
    }
  ];

  // 스터디 데이터 state
  const [studies, setStudies] = useState(initialStudies);

  const handleNavClick = (navItem) => {
    setActiveNav(navItem);

    if (navItem === '스터디 목록') {
      setCurrentPage('list');
    } else if (navItem === '스터디 후기') {
      setCurrentPage('reviewlist');
    } else if (navItem === '마이페이지') {
      setCurrentPage('mypage');
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleHeartClick = (studyId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(studyId)) {
      newFavorites.delete(studyId);
    } else {
      newFavorites.add(studyId);
    }
    setFavorites(newFavorites);
  };

  const handleJoinClick = (studyId) => {
    if (!currentUser) {
      alert('로그인 후 이용해주세요.');
      return;
    }

    const hasJoined = joinedStudies.has(studyId);

    setStudies(prevStudies => prevStudies.map(s => {
      if (s.id !== studyId) return s;

      // 취소 로직
      if (hasJoined) {
        const dec = Math.max(0, s.participantsCurrent - 1);
        const reopened = dec < s.participantsMax;
        return {
          ...s,
          participantsCurrent: dec,
          closed: reopened ? false : s.closed,
          status: reopened ? 'recruiting' : s.status,
          statusText: reopened ? '모집중' : s.statusText
        };
      }

      // 참여 로직
      if (s.closed || s.participantsCurrent >= s.participantsMax) {
        alert('마감된 스터디입니다.');
        return s;
      }

      const inc = s.participantsCurrent + 1;
      const nowClosed = inc >= s.participantsMax;
      return {
        ...s,
        participantsCurrent: inc,
        closed: nowClosed,
        status: nowClosed ? 'closed' : s.status,
        statusText: nowClosed ? '마감' : s.statusText
      };
    }));

    // joinedStudies 업데이트 및 알림
    setJoinedStudies(prev => {
      const newSet = new Set(prev);
      if (hasJoined) {
        newSet.delete(studyId);
        alert('참여가 취소되었습니다.');
      } else {
        newSet.add(studyId);
        alert('스터디에 참여 신청되었습니다!');
      }
      return newSet;
    });
  };

  const handleCreateStudyClick = () => {
    setCurrentPage('create');
  };

  const handleLoginClick = () => {
    setCurrentPage('login');
  };

  const handleSignUpClick = () => {
    setCurrentPage('signup');
  };

  const handleBackClick = () => {
    setCurrentPage('list');
  };

  const handleDeleteStudy = (studyId) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    setStudies(prev => prev.filter(s => s.id !== studyId));
    setJoinedStudies(prev => {
      const newSet = new Set(prev);
      newSet.delete(studyId);
      return newSet;
    });
  };

  const handleReviewClick = (studyId) => {
    const study = studies.find(s => s.id === studyId);
    if (!study) return;
    setReviewTarget(study);
    setCurrentPage('reviewform');
  };

  const filteredStudies = studies.filter(study =>
    study.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (currentPage === 'create') {
    return (
      <div className="create-page">
        <header className="create-header">
          <button className="back-btn" onClick={handleBackClick}>← Back</button>
          <h1 className="create-title">스터디 개설</h1>
        </header>
        <form
          className="create-form"
          onSubmit={e => {
            e.preventDefault();
            const data = new FormData(e.target);
            const title = data.get('title');
            const place = data.get('place');
            const date = data.get('date');
            const time = data.get('time');
            const maxPeople = data.get('max');

            // 간단한 날짜·시간 문자열 조합 (YYYY-MM-DD HH:MM)
            const timeText = `${date} ${time}`;

            const newId = studies.length ? Math.max(...studies.map(s => s.id)) + 1 : 0;
            const newStudy = {
              id: newId,
              title: place,
              time: timeText,
              participantsCurrent: 0,
              participantsMax: Number(maxPeople),
              status: 'recruiting',
              statusText: '모집중',
              closed: false,
              creatorId: currentUser ? currentUser.id : null
            };

            setStudies([...studies, newStudy]);

            alert('스터디가 개설되었습니다!');
            setCurrentPage('list');
          }}
        >
          <label>
            스터디 제목
            <input type="text" name="title" placeholder="예) 알고리즘 스터디" required />
          </label>
          <label>
            장소
            <input type="text" name="place" placeholder="예) 강남역 9번 출구 스타벅스" required />
          </label>
          <label>
            날짜
            <input type="date" name="date" required />
          </label>
          <label>
            시간
            <input type="time" name="time" required />
          </label>
          <label>
            최대 인원
            <input type="number" name="max" min="2" max="50" defaultValue={6} required />
          </label>
          <label>
            설명
            <textarea name="desc" rows="5" placeholder="스터디에 대한 설명을 작성하세요" />
          </label>
          <button className="submit-btn" type="submit">개설하기</button>
        </form>
      </div>
    );
  }

  if (currentPage === 'signup') {
    return (
      <div className="auth-page">
        <header className="auth-header">
          <button className="back-btn" onClick={handleBackClick}>← Back</button>
          <h1 className="auth-title">Sign Up</h1>
        </header>
        <form
          className="auth-form"
          onSubmit={e => {
            e.preventDefault();
            alert('회원가입이 완료되었습니다!');
            setCurrentPage('list');
          }}
        >
          <label>
            이름
            <input type="text" name="name" placeholder="홍길동" required />
          </label>
          <label>
            이메일
            <input type="email" name="email" placeholder="example@example.com" required />
          </label>
          <label>
            비밀번호
            <input type="password" name="password" required />
          </label>
          <label>
            비밀번호 확인
            <input type="password" name="passwordConfirm" required />
          </label>
          <button className="submit-btn" type="submit">회원가입</button>
        </form>
      </div>
    );
  }

  if (currentPage === 'login') {
    return (
      <div className="auth-page">
        <header className="auth-header">
          <button className="back-btn" onClick={handleBackClick}>← Back</button>
          <h1 className="auth-title">Login</h1>
        </header>
        <form
          className="auth-form"
          onSubmit={e => {
            e.preventDefault();
            const data = new FormData(e.target);
            const email = data.get('email');
            setCurrentUser({ id: Date.now(), email });
            alert('로그인 성공!');
            setCurrentPage('list');
          }}
        >
          <label>
            이메일
            <input type="email" name="email" placeholder="example@example.com" required />
          </label>
          <label>
            비밀번호
            <input type="password" name="password" required />
          </label>
          <button className="submit-btn" type="submit">로그인</button>
        </form>
      </div>
    );
  }

  if (currentPage === 'mypage') {
    if (!currentUser) {
      return (
        <div className="auth-page" style={{justifyContent:'center',alignItems:'center'}}>
          <h2>로그인이 필요합니다.</h2>
          <button className="submit-btn" onClick={() => setCurrentPage('login')}>Login</button>
        </div>
      );
    }

    const createdStudies = studies.filter(s => s.creatorId === currentUser.id);
    const joinedList = studies.filter(s => joinedStudies.has(s.id));

    return (
      <div className="mypage-page">
        <header className="create-header">
          <button className="back-btn" onClick={handleBackClick}>← Back</button>
          <h1 className="create-title">마이페이지</h1>
        </header>
        <div className="mypage-content" style={{padding:'40px',overflowY:'auto'}}>
          <h2 style={{marginBottom:'16px'}}>내가 개설한 스터디</h2>
          {createdStudies.length === 0 ? (
            <p style={{color:'#AAB2C8'}}>개설한 스터디가 없습니다.</p>
          ) : (
            createdStudies.map(study => (
              <div key={study.id} className="study-card" style={{marginBottom:'20px'}}>
                <div className="card-content">
                  <div className="study-info">
                    <h3>{study.title}</h3>
                    <p className="study-time">{study.time}</p>
                  </div>
                  <div className="study-meta">
                    <span>{`${study.participantsCurrent}/${study.participantsMax}`}</span>
                    <button className="join-btn" onClick={() => handleDeleteStudy(study.id)}>삭제</button>
                  </div>
                </div>
              </div>
            ))
          )}

          <h2 style={{margin:'40px 0 16px'}}>참여 신청한 스터디</h2>
          {joinedList.length === 0 ? (
            <p style={{color:'#AAB2C8'}}>참여한 스터디가 없습니다.</p>
          ) : (
            joinedList.map(study => (
              <div key={study.id} className="study-card" style={{marginBottom:'20px'}}>
                <div className="card-content">
                  <div className="study-info">
                    <h3>{study.title}</h3>
                    <p className="study-time">{study.time}</p>
                  </div>
                  <div className="study-meta">
                    <span>{`${study.participantsCurrent}/${study.participantsMax}`}</span>
                    <button className="join-btn" onClick={() => handleReviewClick(study.id)}>후기 남기기</button>
                    <button className="join-btn" onClick={() => handleJoinClick(study.id)}>참여 취소</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  if (currentPage === 'reviewform' && reviewTarget) {
    return (
      <div className="create-page">
        <header className="create-header">
          <button className="back-btn" onClick={() => setCurrentPage('mypage')}>← Back</button>
          <h1 className="create-title">후기 작성</h1>
        </header>
        <form
          className="create-form"
          onSubmit={e => {
            e.preventDefault();
            const data = new FormData(e.target);
            const rating = Number(data.get('rating'));
            const text = data.get('text');

            const newReview = {
              id: Date.now(),
              studyId: reviewTarget.id,
              userId: currentUser ? currentUser.id : null,
              rating,
              text,
            };

            setReviews(prev => [...prev, newReview]);
            alert('후기가 등록되었습니다!');
            setCurrentPage('reviewlist');
          }}
        >
          <h3 style={{marginBottom:'16px'}}>{reviewTarget.title}</h3>
          <label>
            별점 (1~5)
            <input type="number" name="rating" min="1" max="5" defaultValue={5} required />
          </label>
          <label>
            후기 내용
            <textarea name="text" rows="5" placeholder="후기를 작성하세요" required />
          </label>
          <button className="submit-btn" type="submit">등록</button>
        </form>
      </div>
    );
  }

  if (currentPage === 'reviewlist') {
    return (
      <div className="mypage-page">
        <header className="create-header">
          <button className="back-btn" onClick={handleBackClick}>← Back</button>
          <h1 className="create-title">스터디 후기</h1>
        </header>
        <div className="mypage-content" style={{padding:'40px',overflowY:'auto'}}>
          {reviews.length === 0 ? (
            <p style={{color:'#AAB2C8'}}>아직 작성된 후기가 없습니다.</p>
          ) : (
            reviews.map(rv => {
              const study = studies.find(s => s.id === rv.studyId);
              return (
                <div key={rv.id} className="study-card" style={{marginBottom:'20px'}}>
                  <div className="card-content">
                    <div className="study-info">
                      <h3>{study ? study.title : '삭제된 스터디'}</h3>
                      <p className="study-time">별점: {'★'.repeat(rv.rating)}{'☆'.repeat(5 - rv.rating)}</p>
                    </div>
                    <div style={{marginTop:'8px'}}>
                      {rv.text}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* 사이드바 */}
      <aside className="sidebar">
        <div className="logo" onClick={() => window.location.reload()}>
          <div className="logo-icon"></div>
          <span className="logo-text">Study</span>
        </div>
        
        <nav className="nav-menu">
          {['스터디 목록', '스터디 후기', '마이페이지'].map((item, index) => (
            <div 
              key={item}
              className={`nav-item ${activeNav === item ? 'active' : ''}`}
              onClick={() => handleNavClick(item)}
            >
              <div className={`nav-icon ${
                index === 0 ? 'overview-icon' :
                index === 1 ? 'insights-icon' :
                index === 2 ? 'mypage-icon' : ''
              }`}></div>
              <span>{item}</span>
            </div>
          ))}
        </nav>

        <button className="create-study-btn" onClick={handleCreateStudyClick}>
          <span>스터디 개설하기</span>
        </button>

        <div className="dashboard-image"></div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="main-content">
        {/* 상단 헤더 */}
        <header className="header">
          <div className="search-bar">
            <div className="search-icon"></div>
            <input 
              type="text" 
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="auth-buttons">
            <button className="login-btn" onClick={handleLoginClick}>Login</button>
            <button className="signup-btn" onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </header>

        {/* 콘텐츠 영역 */}
        <div className="content">
          <h1 className="page-title">스터디 목록</h1>
          
          <nav className="tab-nav">
            {['Upcoming'].map(tab => (
              <div 
                key={tab}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </div>
            ))}
          </nav>

          {/* 스터디 카드 목록 */}
          <div className="study-list">
            {filteredStudies.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#AAB2C8' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                <div style={{ fontSize: '18px' }}>검색 결과가 없습니다.</div>
              </div>
            ) : (
              filteredStudies.map((study) => (
                <div key={study.id} className={`study-card ${study.closed ? 'closed' : ''}`}>
                  <div className="card-content">
                    <div className="study-info">
                      <h3>{study.title}</h3>
                      <p className="study-time">{study.time}</p>
                    </div>
                    <div className="study-meta">
                      <div className="favorites" onClick={() => handleHeartClick(study.id)}>
                        <div className={`heart-icon ${favorites.has(study.id) ? 'filled' : ''}`}></div>
                      </div>
                      <div className="participants">
                        <div className="user-icon"></div>
                        <span>{`${study.participantsCurrent}/${study.participantsMax}`}</span>
                        <span className="separator">-</span>
                        <div className="location-icon"></div>
                      </div>
                      <div className={`status ${study.status}`}>
                        <div className="status-icon"></div>
                        <span>{study.statusText}</span>
                      </div>
                      {(() => {
                        const joined = joinedStudies.has(study.id);
                        const disabled = study.closed && !joined;
                        return (
                          <button
                            className={`join-btn ${disabled ? 'disabled' : ''}`}
                            disabled={disabled}
                            onClick={() => handleJoinClick(study.id)}
                          >
                            {joined ? '참여 취소' : '참여하기'}
                          </button>
                        );
                      })()}
                    </div>
                  </div>
                  <div className="card-menu" onClick={() => alert('메뉴 옵션을 선택하세요.')}>
                    <div className="menu-icon"></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;