import { useState } from 'react';
import { getApplications } from './firebase';
import { Camera, Lock, RefreshCw, FileText } from 'lucide-react';
import './App.css'; // Reuse basic styles

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '00347') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setError('비밀번호가 일치하지 않습니다.');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getApplications();
      setApplications(data);
    } catch (err) {
      console.error(err);
      setError('데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="app-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form className="app-container fade-in" onSubmit={handleLogin} style={{ padding: '40px', textAlign: 'center', borderRadius: '12px' }}>
          <Lock size={40} style={{ marginBottom: '20px', color: 'var(--accent-color)' }} />
          <h2 style={{ marginBottom: '8px' }}>관리자 페이지</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>비밀번호를 입력해주세요.</p>
          
          <input 
            type="password" 
            className="input-text" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="비밀번호" 
            style={{ marginBottom: '16px', textAlign: 'center' }}
            autoFocus
          />
          {error && <p style={{ color: '#d9534f', fontSize: '0.9rem', marginBottom: '16px' }}>{error}</p>}
          
          <button type="submit" className="submit-btn" style={{ padding: '14px' }}>접속하기</button>
        </form>
      </div>
    );
  }

  return (
    <div className="app-wrapper fade-in" style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '40px 20px', overflowY: 'auto' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Camera /> 셔터 사이 3기 지원자 목록</h1>
          <button onClick={fetchData} className="theme-toggle-btn" style={{ position: 'relative', top: 0, right: 0, backgroundColor: 'var(--accent-color)', color: 'white', border: 'none' }}>
            <RefreshCw size={16} /> 새로고침
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>데이터를 불러오는 중입니다...</div>
        ) : applications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <FileText size={40} style={{ color: '#ccc', marginBottom: '16px' }} />
            <p>아직 제출된 지원서가 없습니다.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {applications.map((app, index) => (
              <div key={app.id} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '16px', marginBottom: '16px' }}>
                  <h2 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ backgroundColor: 'var(--accent-color)', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>#{applications.length - index}</span>
                    {app.name} <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 'normal' }}>({app.gender} / {app.birthYear}년생)</span>
                  </h2>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {app.submittedAt?.toDate ? app.submittedAt.toDate().toLocaleString() : '방금 전'}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>연락처</p>
                    <p style={{ fontWeight: 500 }}>{app.contact}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>학교/학과 (상태)</p>
                    <p style={{ fontWeight: 500 }}>{app.schoolMajor} ({app.status})</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>거주 지역</p>
                    <p style={{ fontWeight: 500 }}>{app.location}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>주말 활동 가능 시간</p>
                    <p style={{ fontWeight: 500 }}>{app.timeSlots?.join(', ')}</p>
                  </div>
                </div>

                <div style={{ backgroundColor: '#f8f9fa', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>📸 사진 및 기기 정보</p>
                  <p style={{ fontSize: '0.95rem', marginBottom: '6px' }}><strong>주 사용 기기:</strong> {app.devices?.join(', ')} {app.cameraModel && `(${app.cameraModel})`}</p>
                  <p style={{ fontSize: '0.95rem', marginBottom: '6px' }}><strong>사진 실력:</strong> {app.skillLevel}</p>
                  <p style={{ fontSize: '0.95rem' }}><strong>선호 사진:</strong> {app.photoTypes?.join(', ') || '없음'}</p>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>지원 동기</p>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{app.reason}</p>
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>해보고 싶은 활동</p>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{app.activities || '없음'}</p>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>가보고 싶은 출사 장소</p>
                  <p style={{ fontSize: '0.95rem' }}>{app.locations?.join(', ') || '없음'}</p>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>자기소개</p>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{app.introduction}</p>
                </div>

                {app.questions && (
                  <div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>질문/궁금한 점</p>
                    <p style={{ fontSize: '0.95rem', lineHeight: '1.6', whiteSpace: 'pre-wrap', backgroundColor: '#fff3cd', padding: '10px', borderRadius: '6px' }}>{app.questions}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
