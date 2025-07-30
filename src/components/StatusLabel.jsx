import React from "react";
import styles from "./StatusLabel.module.css";

export default function StatusLabel({ status }) {
  console.log("StatusLabel rendered with status:", status);
  
  const getStatusText = (status) => {
    switch (status) {
      case "APPROVED":
        return "승인";
      case "REJECTED":
        return "거부";
      case "PENDING":
        return "대기";
      case "WITHDRAWAL":
        return "탈퇴";
      default:
        return "대기";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "APPROVED":
        return styles.approved;
      case "REJECTED":
        return styles.rejected;
      case "PENDING":
        return styles.pending;
      case "WITHDRAWAL":
        return styles.withdrawal;
      default:
        return styles.pending;
    }
  };

  return (
    <div className={`${styles.statusLabel} ${getStatusClass(status)}`}>
      {getStatusText(status)}
    </div>
  );
}
