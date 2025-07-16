import React, { useState } from "react";
import BodyButton from "../components/BodyButton";
import "./MypagePage.css";

export default function MypagePage() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [allowedCompanies, setAllowedCompanies] = useState([]);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");

  return (
    <div className="register-bg">
      <div className="register-center">
        <h2 className="register-title">개인정보 수정</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label className="register-label">성함 *</label>
          <input
            className="register-input"
            type="text"
            placeholder="홍길동"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label className="register-label">이메일 주소 *</label>
          <input
            className="register-input"
            type="email"
            placeholder="example@example.com"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <label className="register-label">기관/기업명 *</label>
          <input
            className="input-disabled register-input"
            type="text"
            placeholder="기관/기업명"
            disabled
          />

          <div className="register-divider">
            <h3>비밀번호 재설정</h3>
            <input
              type="checkbox"
              value={isPasswordReset}
              onChange={() => {
                setIsPasswordReset(!isPasswordReset);
                if (isPasswordReset) {
                  setCurrentPassword("");
                  setPassword("");
                  setPasswordConfirm("");
                }
              }}
            />
          </div>
          <label className="register-label">현재 비밀번호 *</label>
          <input
            className={`register-input ${
              !isPasswordReset ? "input-disabled" : ""
            }`}
            type="password"
            placeholder="********"
            required
            onChange={(e) => setCurrentPassword(e.target.value)}
            value={currentPassword}
            disabled={!isPasswordReset}
          />

          <label className="register-label">새 비밀번호 *</label>
          <input
            className={`register-input ${
              !isPasswordReset ? "input-disabled" : ""
            }`}
            type="password"
            placeholder="********"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={!isPasswordReset}
          />
          <label className="register-label">새 비밀번호 확인 *</label>
          <input
            className={`register-input ${
              !isPasswordReset ? "input-disabled" : ""
            }`}
            type="password"
            placeholder="********"
            required
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
            disabled={!isPasswordReset}
          />

          <BodyButton type="submit">회원가입</BodyButton>
        </form>
        <div className="register-link-row">
          <span>계정을 삭제하시겠습니까?</span>
          <a className="register-link" href="/login">
            회원탈퇴
          </a>
        </div>
      </div>
    </div>
  );
}
