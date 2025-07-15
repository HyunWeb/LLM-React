import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BodyButton from "../components/BodyButton";
import "./LoginPage.css";
import { loginUser } from "../api/user.Api";
import { useCustomAlertStore } from "../store/store";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsCustomAlertOpen, setAlertTitle, setAlertMessage, setAlertType } =
    useCustomAlertStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    let response;
    try {
      response = await loginUser(userData);
      console.log(response);
    } catch (error) {
      console.error("로그인 에러:", error);
    }
    if (response.id) {
      setIsCustomAlertOpen(true);
      setAlertTitle("로그인 성공");
      setAlertMessage(`${response.name}님 환영합니다.`);
      setAlertType("success");
      navigate("/");
    } else {
      setIsCustomAlertOpen(true);
      setAlertTitle("로그인 실패");
      setAlertMessage("로그인에 실패했습니다.");
      setAlertType("error");
    }

    // 인수인계 코드
    // const envEmail = process.env.REACT_APP_USER_EMAIL;
    // const envPassword = process.env.REACT_APP_USER_PASSWORD;
    // if (email === envEmail && password === envPassword) {
    //   localStorage.setItem("userEmail", email);
    //   setError("");
    //   navigate("/");
    // } else {
    //   setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    // }
  };

  return (
    <div className="login-bg">
      <div className="login-center">
        <h2 className="login-title">로그인</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="email"
            placeholder="이메일 *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="login-input"
            type="password"
            placeholder="비밀번호 *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <BodyButton type="submit">계속</BodyButton>
        </form>
        {/* {error && <div className="login-error">{error}</div>} */}
        <div className="login-link-row">
          <span>계정이 없으신가요?</span>
          <a className="login-link" href="/register">
            회원가입
          </a>
        </div>

        <div className="login-policy-row">
          <a className="login-policy" href="/terms">
            이용약관
          </a>
          <span className="login-policy-divider">|</span>
          <a className="login-policy" href="/privacy">
            개인정보 보호 정책
          </a>
          <span className="login-policy-divider">|</span>
          <a className="login-policy" href="/find-password">
            비밀번호 찾기
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
