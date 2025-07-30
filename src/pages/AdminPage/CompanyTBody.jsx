import React from "react";
import StatusLabel from "../../components/StatusLabel";
import styles from "./MemberTable.module.css";
export default function CompanyTBody({ company, index }) {
  return (
    <div className={styles.tableRow}>
      <div className={styles.tableCell}>{index + 1}</div>
      <div className={styles.tableCell}>{company.companyName}</div>
      <div className={styles.tableCell}>{company.businessNumber}</div>
      <div className={styles.tableCell}>{company.companyNumber}</div>
      <div className={styles.tableCell}>{company.job}</div>
      <div className={styles.tableCell}>
        <StatusLabel status={company.status} />
      </div>
      <div className={styles.tableCell}>
        <div className={styles.buttonContainer}>
          <button
            className={styles.approveButton + " " + styles.button}
            disabled={
              company.status === "APPROVED" || company.status === "PENDING"
            }
          >
            승인
          </button>
          <button
            className={styles.rejectButton + " " + styles.button}
            disabled={
              company.status === "REJECTED" ||
              company.status === "PENDING" ||
              company.status === "WITHDRAWAL"
            }
          >
            거부
          </button>
        </div>
      </div>
    </div>
  );
}
