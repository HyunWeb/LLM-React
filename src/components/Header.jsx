import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import HeaderButton from "./HeaderButton";
import styles from "./Header.module.css";
import btnStyles from "./HeaderButton.module.css";
import useAuthStore from "../store/store";

function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const { userEmail, setUserEmail } = useAuthStore();
  // const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    // 로그인 정보(localStorage)도 mount 시 확인
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 홈(채팅) 화면으로 이동하는 함수
  const goToChat = () => {
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.sideBarBTN} onClick={toggleSidebar}>
          {/* 메뉴바 로고 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-layout-sidebar"
            viewBox="0 0 16 16"
          >
            <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5-1v12h9a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM4 2H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2z" />
          </svg>
        </button>
        <img
          src="/keti_mini.svg"
          alt="KETI"
          className={styles.ketiLogo}
          onClick={goToChat}
        />
      </div>
      <div className={styles.right}>
        {userEmail ? (
          <div
            className={`${styles.userInitial} ${styles.userInitialBtn}`}
            title={userEmail}
            onClick={() => {
              localStorage.removeItem("userEmail");
              window.location.reload();
            }}
          >
            {userEmail[0].toUpperCase()}
          </div>
        ) : (
          <>
            <HeaderButton
              className={btnStyles.login}
              onClick={() => navigate("/login")}
            >
              로그인
            </HeaderButton>
            {!isMobile && (
              <HeaderButton
                className={btnStyles.signup}
                onClick={() => navigate("/register")}
              >
                회원가입
              </HeaderButton>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
