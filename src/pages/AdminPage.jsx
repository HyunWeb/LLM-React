import React, { useState } from "react";
import styles from "./AdminPage.module.css";
import UserCard from "./AdminPage/UserCard";
import CompanyCard from "./AdminPage/CompanyCard";
import MemberTable from "./AdminPage/MemberTable";
import CompanyTable from "./AdminPage/CompanyTable";
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
          {/* 현재 탭의 라벨 표시 */}
          <h2>{tabs.find((tab) => tab.id === activeTab)?.label}</h2>

          <div
            className={` ${
              activeTab === "member-management" ||
              activeTab === "company-management"
                ? styles.approvalCardsTable
                : styles.approvalCards
            }`}
          >
            {activeTab === "member-approval" ? (
              Array.from({ length: 20 }, (_, index) => <UserCard key={index} />)
            ) : activeTab === "company-approval" ? (
              Array.from({ length: 20 }, (_, index) => (
                <CompanyCard key={index} />
              ))
            ) : activeTab === "member-management" ? (
              <MemberTable />
            ) : activeTab === "company-management" ? (
              <CompanyTable />
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}
