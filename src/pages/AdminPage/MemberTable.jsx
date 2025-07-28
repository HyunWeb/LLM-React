import React from "react";
import styles from "./MemberTable.module.css";

import MemberTBody from "./MemberTBody";

export default function MemberTable() {
  return (
    <div className={styles.memberTable}>
      <ul className={styles.tableHeader}>
        <li>
          <input type="checkbox" />
        </li>
        <li>순번</li>
        <li>이름</li>
        <li>이메일</li>
        <li>기관/기업명</li>
        <li>가입일</li>
        <li>상태</li>
        <li>권한관리</li>
      </ul>
      <ul className={styles.tableBody}>
        <li>
          <MemberTBody />
        </li>
      </ul>
    </div>
  );
}
