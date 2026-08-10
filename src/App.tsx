import { useState } from 'react';
import { Camera, CheckCircle2 } from 'lucide-react';
import './App.css';

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    birthYear: '',
    contact: '',
    schoolMajor: '',
    status: '',
    location: '',
    devices: [] as string[],
    skillLevel: '',
    photoTypes: [] as string[],
    reason: '',
    activities: '',
    locations: [] as string[],
    timeSlots: [] as string[],
    introduction: '',
    questions: '',
    agreement: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, value: string) => {
    setFormData(prev => {
      const array = prev[name as keyof typeof formData] as string[];
      if (array.includes(value)) {
        return { ...prev, [name]: array.filter(item => item !== value) };
      } else {
        return { ...prev, [name]: [...array, value] };
      }
    });
  };

  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, agreement: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.agreement) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsSubmitted(true);
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.gender !== '' &&
      formData.birthYear !== '' &&
      formData.contact.trim() !== '' &&
      formData.schoolMajor.trim() !== '' &&
      formData.status !== '' &&
      formData.location.trim() !== '' &&
      formData.devices.length > 0 &&
      formData.skillLevel !== '' &&
      formData.reason.trim() !== '' &&
      formData.timeSlots.length > 0 &&
      formData.introduction.trim() !== '' &&
      formData.agreement
    );
  };

  if (isSubmitted) {
    return (
      <div className="app-container fade-in">
        <div className="success-view">
          <div className="success-icon delay-1">
            <Camera size={40} />
          </div>
          <h1 className="success-title delay-2">지원 완료! 📸</h1>
          <p className="success-message delay-3">
            <strong>셔터 사이 3기에 지원해주셔서 감사합니다.</strong><br/><br/>
            지원서를 확인한 후<br/>
            1차 합격자분들께 개별적으로 연락드릴 예정입니다.
          </p>
          <p className="success-footer delay-4">우리의 다음 장면에서 만나요 :)</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container fade-in">
      <div className="hero-section">
        <img src="/hero.jpg" alt="Film Camera Aesthetic" className="hero-image" />
        <div className="hero-overlay"></div>
      </div>

      <div className="header-content">
        <div className="club-label">
          <Camera size={16} /> SHUTTER SAI
        </div>
        <h1 className="main-title">셔터 사이 3기 지원하기</h1>
        <p className="subtitle">셔터와 셔터 사이, 우리의 순간을 기록합니다.</p>
        
        <div className="tags">
          <span className="tag">2026.08 — 2026.12</span>
          <span className="tag">서울·서울 근교</span>
          <span className="tag">격주 주말 출사</span>
          <span className="tag">사진 초보 환영</span>
        </div>

        <div className="intro-quote">
          사진을 좋아하는 대학생들이 함께 걷고, 찍고, 기록하는 사진 동아리입니다.<br/>
          카메라부터 휴대폰까지, 사진을 좋아한다면 누구나 환영해요 📸
        </div>
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        
        {/* 기본 정보 */}
        <div className="form-section slide-up delay-1">
          <h2 className="section-title">기본 정보</h2>
          
          <div className="form-group">
            <label className="form-label">1. 이름 <span className="required-mark">*</span></label>
            <input type="text" name="name" className="input-text" value={formData.name} onChange={handleInputChange} required placeholder="내 답변" />
          </div>

          <div className="form-group">
            <label className="form-label">2. 성별 <span className="required-mark">*</span></label>
            <div className="radio-group">
              {['여성', '남성'].map(option => (
                <label key={option} className={`radio-label ${formData.gender === option ? 'selected' : ''}`}>
                  <input type="radio" name="gender" value={option} checked={formData.gender === option} onChange={handleInputChange} required />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">3. 출생연도 <span className="required-mark">*</span></label>
            <div className="radio-group">
              {['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007'].map(option => (
                <label key={option} className={`radio-label ${formData.birthYear === option ? 'selected' : ''}`}>
                  <input type="radio" name="birthYear" value={option} checked={formData.birthYear === option} onChange={handleInputChange} required />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">4. 연락처 <span className="required-mark">*</span></label>
            <input type="tel" name="contact" className="input-text" value={formData.contact} onChange={handleInputChange} required placeholder="010-0000-0000" />
          </div>

          <div className="form-group">
            <label className="form-label">5. 학교 / 학과 <span className="required-mark">*</span></label>
            <input type="text" name="schoolMajor" className="input-text" value={formData.schoolMajor} onChange={handleInputChange} required placeholder="내 답변" />
          </div>

          <div className="form-group">
            <label className="form-label">6. 현재 상태 <span className="required-mark">*</span></label>
            <div className="radio-group">
              {['재학', '휴학'].map(option => (
                <label key={option} className={`radio-label ${formData.status === option ? 'selected' : ''}`}>
                  <input type="radio" name="status" value={option} checked={formData.status === option} onChange={handleInputChange} required />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">7. 거주 지역 <span className="required-mark">*</span></label>
            <input type="text" name="location" className="input-text" value={formData.location} onChange={handleInputChange} required placeholder="내 답변" />
          </div>
        </div>

        {/* 📷 나의 사진 취향 */}
        <div className="form-section slide-up delay-2">
          <h2 className="section-title">📷 나의 사진 취향</h2>
          
          <div className="form-group">
            <label className="form-label">8. 주로 어떤 기기로 사진을 찍으시나요? <span className="required-mark">*</span></label>
            <span className="help-text">복수 선택 가능</span>
            <div className="checkbox-group" style={{marginTop: '12px'}}>
              {['아이폰', '갤럭시', 'DSLR', '미러리스', '필름 카메라', '디지털카메라 / 컴팩트 카메라', '기타'].map(option => (
                <label key={option} className={`checkbox-label ${formData.devices.includes(option) ? 'selected' : ''}`}>
                  <input type="checkbox" checked={formData.devices.includes(option)} onChange={() => handleCheckboxChange('devices', option)} />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">9. 사진 실력은 어느 정도라고 생각하시나요? <span className="required-mark">*</span></label>
            <div className="radio-group">
              {[
                { value: '이제 막 시작했어요', label: '🌱 이제 막 시작했어요' },
                { value: '그냥 찍는 게 좋아요', label: '📱 그냥 찍는 게 좋아요' },
                { value: '취미로 종종 찍어요', label: '📸 취미로 종종 찍어요' },
                { value: '사진을 꽤 오래 찍었어요', label: '🎞️ 사진을 꽤 오래 찍었어요' }
              ].map(option => (
                <label key={option.value} className={`radio-label ${formData.skillLevel === option.value ? 'selected' : ''}`}>
                  <input type="radio" name="skillLevel" value={option.value} checked={formData.skillLevel === option.value} onChange={handleInputChange} required />
                  {option.label}
                </label>
              ))}
            </div>
            <span className="help-text" style={{marginTop: '10px', fontWeight: 600, color: 'var(--text-primary)'}}>
              사진 실력은 선발 기준이 아니에요!
            </span>
          </div>

          <div className="form-group">
            <label className="form-label">10. 어떤 사진을 찍는 걸 좋아하시나요?</label>
            <span className="help-text">복수 선택 가능</span>
            <div className="checkbox-group" style={{marginTop: '12px'}}>
              {['인물', '풍경', '거리 / 스냅', '음식', '건축물', '야경', '감성 사진', '아직 잘 모르겠어요', '기타'].map(option => (
                <label key={option} className={`checkbox-label ${formData.photoTypes.includes(option) ? 'selected' : ''}`}>
                  <input type="checkbox" checked={formData.photoTypes.includes(option)} onChange={() => handleCheckboxChange('photoTypes', option)} />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* 🌿 셔터 사이와 함께 */}
        <div className="form-section slide-up delay-3">
          <h2 className="section-title">🌿 셔터 사이와 함께</h2>
          
          <div className="form-group">
            <label className="form-label">11. 셔터 사이에 지원하게 된 이유를 알려주세요. <span className="required-mark">*</span></label>
            <textarea name="reason" className="textarea" value={formData.reason} onChange={handleInputChange} required placeholder="사진을 좋아하게 된 계기나 함께 활동하고 싶은 이유를 편하게 적어주세요 :)" />
          </div>

          <div className="form-group">
            <label className="form-label">12. 동아리에서 해보고 싶은 활동이 있다면 알려주세요!</label>
            <textarea name="activities" className="textarea" value={formData.activities} onChange={handleInputChange} placeholder="내 답변" />
          </div>

          <div className="form-group">
            <label className="form-label">13. 가보고 싶은 출사 장소가 있나요?</label>
            <span className="help-text">복수 선택 가능</span>
            <div className="checkbox-group" style={{marginTop: '12px'}}>
              {['한강', '서울숲', '성수', '북촌 / 서촌', '망원', '공원 / 자연', '야경 명소', '시장 / 골목', '서울 근교', '직접 추천하고 싶어요!'].map(option => (
                <label key={option} className={`checkbox-label ${formData.locations.includes(option) ? 'selected' : ''}`}>
                  <input type="checkbox" checked={formData.locations.includes(option)} onChange={() => handleCheckboxChange('locations', option)} />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">14. 평소 주말 활동 가능 시간대를 알려주세요. <span className="required-mark">*</span></label>
            <span className="help-text">복수 선택 가능</span>
            <div className="checkbox-group" style={{marginTop: '12px'}}>
              {['토요일 낮', '토요일 저녁', '일요일 낮', '일요일 저녁', '대부분 가능', '일정에 따라 달라요'].map(option => (
                <label key={option} className={`checkbox-label ${formData.timeSlots.includes(option) ? 'selected' : ''}`}>
                  <input type="checkbox" checked={formData.timeSlots.includes(option)} onChange={() => handleCheckboxChange('timeSlots', option)} />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">15. 간단한 자기소개를 부탁드려요 :) <span className="required-mark">*</span></label>
            <textarea name="introduction" className="textarea" value={formData.introduction} onChange={handleInputChange} required placeholder="성격, 취미, 좋아하는 것 등 자유롭게 알려주세요!" />
          </div>

          <div className="form-group">
            <label className="form-label">16. 셔터 사이에 궁금한 점이 있다면 자유롭게 작성해주세요.</label>
            <span className="help-text">선택 입력</span>
            <textarea name="questions" className="textarea" style={{minHeight: '80px', marginTop: '12px'}} value={formData.questions} onChange={handleInputChange} placeholder="내 답변" />
          </div>
        </div>

        {/* 지원 전 확인 */}
        <div className="form-section slide-up delay-4">
          <h2 className="section-title">📌 지원 전 확인</h2>
          
          <div className="agreements-box">
            <div className="agreement-item">
              <CheckCircle2 size={18} color="var(--accent-color)" style={{minWidth: '18px', marginTop: '2px'}} />
              <span>3기 활동 기간은 <strong>2026년 8월~12월</strong>입니다.</span>
            </div>
            <div className="agreement-item">
              <CheckCircle2 size={18} color="var(--accent-color)" style={{minWidth: '18px', marginTop: '2px'}} />
              <span>1차 지원서 합격자에게 <strong>개별 연락 후 조편성을 위한 OT가 진행됩니다.</strong></span>
            </div>
            <div className="agreement-item">
              <CheckCircle2 size={18} color="var(--accent-color)" style={{minWidth: '18px', marginTop: '2px'}} />
              <span>정치·종교·시민단체와 무관한 대학생 자율 동아리이며, <strong>다단계 및 포교 목적의 참여는 제한됩니다.</strong></span>
            </div>
            
            <div className="agreement-checkbox-wrapper">
              <label className="checkbox-label agreement-checkbox" style={{border: 'none', padding: 0, backgroundColor: 'transparent'}}>
                <input type="checkbox" checked={formData.agreement} onChange={handleAgreementChange} required style={{width: '22px', height: '22px'}} />
                위 내용을 확인했습니다. ✓
              </label>
            </div>
          </div>
        </div>

        <div className="submit-section slide-up delay-4">
          <p className="submit-message">우리의 다음 장면에서 만나요. 🌿</p>
          <button type="submit" className="submit-btn" disabled={!isFormValid()}>
            <Camera size={20} /> 📸 셔터 사이 3기 지원하기
          </button>
        </div>

      </form>
    </div>
  );
}

export default App;
