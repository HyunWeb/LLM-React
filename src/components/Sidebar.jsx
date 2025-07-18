import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useChatMenuStore } from "../store/store";

function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { isSidebarOpen, setIsSidebarOpen } = useChatMenuStore();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setActiveMenu("home");
    } else if (path.startsWith("/chat")) {
      setActiveMenu("chat");
    } else if (path === "/mypage") {
      setActiveMenu("mypage");
    } else if (path === "/admin") {
      setActiveMenu("admin");
    } else if (path === "/mypage") {
      setActiveMenu("mypage");
    }
  }, [location.pathname]);

  // 채팅 메뉴의 각 채팅방 활성화 상태 체크
  const [isChatActive, setIsChatActive] = useState(1);

  // 홈 클릭 시 채팅 메뉴 닫기
  const handleChatClick = (chatId) => {
    setIsChatOpen(false);
  };
  // const [chatList, setChatList] = useState([]);

  // 채팅 메뉴 열기
  const handleChatOpen = () => {
    setIsChatOpen((prev) => !prev);
    navigate(`/chat/${1}`); // 열리고 1번 채팅창으로 이동
  };

  const handleChatActive = (chatId) => {
    setIsChatActive(chatId); // 1 or 2
  };

  const handleSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav
      className={`${styles.sidebar} ${
        isSidebarOpen ? styles.close : styles.open
      }`}
    >
      <header className={styles.header}>
        <Link to="/">
          <img src="/white_logo.png" alt="logo" className={styles.logo} />
        </Link>
        <button
          className={styles.closeButton}
          onClick={() => handleSidebarOpen()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-chevron-double-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
            <path
              fillRule="evenodd"
              d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
          </svg>
        </button>
      </header>
      <section className={styles.menuList}>
        <h3 className={styles.title}>메뉴</h3>

        {/* 메인 메뉴 */}
        <ul className={styles.chatList}>
          <li className={`${styles.chatItem} ${styles.chatItemTitle}`}>
            <Link
              className={`${styles.chatTitle} ${
                activeMenu === "home" ? styles.active : ""
              }`}
              to="/"
              onClick={() => handleChatClick()}
            >
              {activeMenu === "home" ? (
                <img src="/menuIcon/house.svg" alt="home" />
              ) : (
                <img src="/menuIcon/house-fill.svg" alt="home" />
              )}
              <span>홈</span>
            </Link>
          </li>
          {user && (
            <>
              <li
                className={`${styles.chatItem} ${styles.chatItemTitle}`}
                onClick={() => handleChatOpen()}
              >
                <Link
                  to="/chat"
                  className={`${styles.chatTitle} ${
                    activeMenu === "chat" ? styles.active : ""
                  }`}
                >
                  {activeMenu === "chat" ? (
                    <img src="/menuIcon/chat.svg" alt="chat" />
                  ) : (
                    <img src="/menuIcon/chat-fill.svg" alt="chat" />
                  )}
                  <span>채팅</span>
                  {/* 채팅 메뉴 열기 버튼 */}
                  <button className={styles.chatItemButton}>
                    {activeMenu === "chat" ? (
                      <img
                        src="/menuIcon/chevron-down_black.svg"
                        alt="chevron-down"
                        className={`${styles.chatIcon} ${
                          isChatOpen ? styles.open : ""
                        }`}
                      />
                    ) : (
                      <img
                        src="/menuIcon/chevron-down_white.svg"
                        alt="chevron-down"
                        className={`${styles.chatIcon} ${
                          isChatOpen ? styles.open : ""
                        }`}
                      />
                    )}
                  </button>
                </Link>

                <ul
                  className={`${styles.chatItemList} ${
                    isChatOpen ? styles.open : ""
                  }`}
                >
                  <li>
                    <Link
                      to="/chat/1"
                      className={isChatActive === 1 ? styles.active : ""}
                      onClick={(e) => {
                        handleChatActive(1);
                        e.stopPropagation();
                      }}
                    >
                      {isSidebarOpen ? "1" : "채팅 1"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/chat/2"
                      className={isChatActive === 2 ? styles.active : ""}
                      onClick={(e) => {
                        handleChatActive(2);
                        e.stopPropagation();
                      }}
                    >
                      {isSidebarOpen ? "2" : "채팅 2"}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className={`${styles.chatItem} ${styles.chatItemTitle}`}>
                <Link
                  className={`${styles.chatTitle} ${
                    activeMenu === "mypage" ? styles.active : ""
                  }`}
                  onClick={() => handleChatClick()}
                  to="/mypage"
                >
                  {activeMenu === "mypage" ? (
                    <img src="/menuIcon/gear.svg" alt="account" />
                  ) : (
                    <img src="/menuIcon/gear-fill.svg" alt="account" />
                  )}
                  <span>계정 관리</span>
                </Link>
              </li>
              <li className={styles.chatItem}>
                <Link
                  className={`${styles.chatTitle} ${
                    activeMenu === "admin" ? styles.active : ""
                  }`}
                  to="/admin"
                >
                  {activeMenu === "admin" ? (
                    <img src="/menuIcon/person-badge.svg" alt="admin" />
                  ) : (
                    <img src="/menuIcon/person-badge-fill.svg" alt="admin" />
                  )}
                  <span>관리자 페이지</span>
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* 관리 메뉴 */}
        <ul className={styles.subChatList}>
          <li className={styles.chatItem}>
            {user ? (
              <button
                className={styles.chatTitle}
                onClick={() => {
                  localStorage.removeItem("userEmail");
                  localStorage.removeItem("user");
                  navigate("/");
                  window.location.reload();
                }}
              >
                <img src="/menuIcon/door-closed-fill.svg" alt="logout" />
                <span>로그아웃</span>
              </button>
            ) : (
              <button
                className={styles.chatTitle}
                onClick={() => {
                  navigate("/login");
                }}
              >
                <img src="/menuIcon/door-open-fill.svg" alt="logout" />
                <span>로그인</span>
              </button>
            )}
          </li>
          {!user ? (
            <li className={styles.chatItem}>
              <Link className={styles.chatTitle} to="/register">
                <img src="/menuIcon/person-plus-fill.svg" alt="register" />
                <span>회원가입</span>
              </Link>
            </li>
          ) : null}
        </ul>
      </section>
      {user ? (
        <section className={styles.userInfo}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </section>
      ) : (
        <section className={styles.userInfo}>
          <h3>로그인 후 이용해주세요.</h3>
        </section>
      )}
    </nav>
  );
}

export default Sidebar;
