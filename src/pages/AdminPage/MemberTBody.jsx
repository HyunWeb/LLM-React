import React from "react";
import StatusLabel from "../../components/StatusLabel";
import styles from "./MemberTable.module.css";
export default function MemberTBody() {
  return (
    <ul className={styles.tableBodyItem}>
      <li>
        <input type="checkbox" />
      </li>
      <li>01</li>
      <li>홍길동</li>
      <li>hong@example.com</li>
      <li>기관/기업명1</li>
      <li>2021-01-01</li>
      <li>
        <StatusLabel />
      </li>
      <li>
        <div>
          <button>승인</button>
          <button>탈퇴</button>
        </div>
      </li>
    </ul>
  );
}
