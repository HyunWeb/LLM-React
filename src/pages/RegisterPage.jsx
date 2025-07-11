import React from 'react';
import BodyButton from '../components/BodyButton';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제 회원가입 처리 대신 바로 채팅 페이지로 이동
    navigate('/');
  };

  return (
    <div className="register-bg">
      <div className="register-center">
        <h2 className="register-title">계정 만들기</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label className="register-label">이메일 주소 *</label>
          <input className="register-input" type="email" placeholder="이메일 주소" />
          <label className="register-label">비밀번호 *</label>
          <input className="register-input" type="password" placeholder="비밀번호" />
          <label className="register-label">비밀번호 확인 *</label>
          <input className="register-input" type="password" placeholder="비밀번호 확인" />
          <label className="register-label">기관/기업명 *</label>
          <input className="register-input" type="text" placeholder="기관/기업명" />
          <label className="register-label">성함 *</label>
          <input className="register-input" type="text" placeholder="성함" />
          <BodyButton type="submit">회원가입</BodyButton>
        </form>
        <div className="register-link-row">
          <span>이미 계정이 있으신가요?</span>
          <a className="register-link" href="/login">로그인</a>
        </div>
        <div className="register-policy-row">
          <a className="register-policy" href="/terms">이용약관</a>
          <span className="register-policy-divider">|</span>
          <a className="register-policy" href="/privacy">개인정보 보호 정책</a>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage; 