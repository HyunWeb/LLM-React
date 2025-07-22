import React, { useState } from "react";
import styles from "./AdminPage.module.css";
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("member-approval");

  const tabs = [
    { id: "member-approval", label: "회원 승인" },
    { id: "company-approval", label: "기업등록 승인" },
    { id: "member-management", label: "회원 관리" },
    { id: "company-management", label: "기업 관리" },
  ];

  return (
    <div className={styles.adminPage}>
      <header className={styles.adminHeader}>
        <h1>관리자 페이지</h1>
        <p>회원 관리와 기업 관리를 수행할 수 있습니다.</p>
      </header>

      <nav className={styles.adminTabs}>
        <ul>
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                className={activeTab === tab.id ? styles.active : ""}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className={styles.adminContent}>
        <section className={styles.contentSection}>
          <h2>회원 승인</h2>
          <div className={styles.approvalCards}>
            {/* 승인 카드들 */}
            {Array.from({ length: 20 }, (_, index) => (
              <article key={index} className={styles.approvalCard}>
                <div className={styles.userInfo}>
                  <h3>황종현</h3>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-envelope-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                    </svg>
                    jonghyun1803@naver.com
                  </p>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-building-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5" />
                    </svg>
                    데이터메티카
                  </p>
                </div>
                <div className={styles.actionButtons}>
                  <button className={styles.approveBtn}>승인</button>
                  <button className={styles.rejectBtn}>거부</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
