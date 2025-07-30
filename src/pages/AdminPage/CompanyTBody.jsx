import React from "react";
import StatusLabel from "../../components/StatusLabel";
import styles from "./MemberTable.module.css";
export default function CompanyTBody({ status }) {
  return (
    <div className={styles.tableRow}>
      <div className={styles.tableCell}>01</div>
      <div className={styles.tableCell}>넥스트웨이브</div>
      <div className={styles.tableCell}>123-45-67890</div>
      <div className={styles.tableCell}>02-3456-7890</div>
      <div className={styles.tableCell}>소프트웨어 개발</div>
      <div className={styles.tableCell}>
        <StatusLabel status={status} />
      </div>
      <div className={styles.tableCell}>
        <div className={styles.buttonContainer}>
          <button className={styles.approveButton + " " + styles.button} disabled={status === "APPROVED" || status === "PENDING"}>승인</button>
          <button className={styles.rejectButton + " " + styles.button} disabled={status === "REJECTED" || status === "PENDING" || status === "WITHDRAWAL"}>거부</button>
        </div>
      </div>
    </div>
  );
}
