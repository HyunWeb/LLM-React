import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import styles from "./Sidebar.module.css";
import { useChatMenuStore } from "../store/store";
import ChatMenu from "./ChatMenu";
import { getChatList } from "../api/chatApi";

function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { isMenuOpen, setIsMenuOpen, isAlertModalOpen, setIsAlertModalOpen } =
    useChatMenuStore();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatActive, setIsChatActive] = useState(1);

  // 홈 클릭 시 채팅 메뉴 닫기
  const handleChatClick = (chatId) => {
    setIsChatOpen(false);
  };
  const [chatList, setChatList] = useState([]);

  // 채팅 메뉴 열기
  const handleChatOpen = () => {
    setIsChatOpen((prev) => !prev);
    navigate(`/chat/${1}`); // 열리고 1번 채팅창으로 이동
  };

  const handleChatActive = (chatId) => {
    setIsChatActive(chatId); // 1 or 2
  };

  return (
    <nav className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <header className={styles.header}>
        <Link to="/">
          <img src="/white_logo.png" alt="logo" className={styles.logo} />
        </Link>
        <button className={styles.closeButton} onClick={toggleSidebar}>
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

        <div className={styles.menuList_container}>
          {/* 선택 박스 */}
          <div
            className={styles.selectionBox}
            style={{
              transform: `translateY(${4 * 24}%)`,
            }}
          />
          {/* 메인 메뉴 */}
          <ul className={styles.chatList}>
            <li className={`${styles.chatItem} ${styles.chatItemTitle}`}>
              <Link
                className={styles.chatTitle}
                to="/"
                onClick={() => handleChatClick()}
              >
                <img src="/menuIcon/house-fill.svg" alt="home" />
                <span>홈</span>
              </Link>
            </li>
            <li
              className={`${styles.chatItem} ${styles.chatItemTitle}`}
              onClick={() => handleChatOpen()}
            >
              <Link to="/chat" className={styles.chatTitle}>
                <img src="/menuIcon/chat-fill.svg" alt="chat" />
                <span>채팅</span>
                <button className={styles.chatItemButton}>
                  <img
                    src="/menuIcon/chevron-down_white.svg"
                    alt="chevron-down"
                    className={`${styles.chatIcon} ${
                      isChatOpen ? styles.open : ""
                    }`}
                  />
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
                    채팅 1
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
                    채팅 2
                  </Link>
                </li>
              </ul>
            </li>
            <li className={`${styles.chatItem} ${styles.chatItemTitle}`}>
              <Link
                className={styles.chatTitle}
                onClick={() => handleChatClick()}
                to="/mypage"
              >
                <img src="/menuIcon/gear-fill.svg" alt="account" />
                <span>계정 관리</span>
              </Link>
            </li>
            <li className={styles.chatItem}>
              <Link className={styles.chatTitle} to="/admin">
                <img src="/menuIcon/person-badge-fill.svg" alt="admin" />
                관리자 페이지
              </Link>
            </li>
          </ul>
        </div>

        {/* 관리 메뉴 */}
        <ul className={styles.subChatList}>
          <li className={styles.chatItem}>
            {user ? (
              <button
                className={styles.chatTitle}
                onClick={() => {
                  localStorage.removeItem("userEmail");
                  localStorage.removeItem("user");
                  window.location.reload();
                }}
              >
                <img src="/menuIcon/door-closed-fill.svg" alt="logout" />
                로그아웃
              </button>
            ) : (
              <button
                className={styles.chatTitle}
                onClick={() => {
                  navigate("/login");
                  toggleSidebar();
                }}
              >
                <img src="/menuIcon/door-open-fill.svg" alt="logout" />
                로그인
              </button>
            )}
          </li>
          {!user ? (
            <li className={styles.chatItem}>
              <Link className={styles.chatTitle} to="/register">
                <img src="/menuIcon/person-plus-fill.svg" alt="register" />
                회원가입
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
