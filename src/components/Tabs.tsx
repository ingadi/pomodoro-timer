import { useState } from "react";
import styles from "./Tabs.module.css";

export default function Tabs({ data }: Props) {
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);

  return (
    <>
      <nav>
        <ul className={styles.labels}>
          {data.map(([label], idx) => (
            <li
              key={idx}
              className={`${styles.label} ${
                selectedTabIdx === idx ? styles.active : ""
              }`}
              onClick={() => setSelectedTabIdx(idx)}
            >
              {label}
            </li>
          ))}
        </ul>
      </nav>
      <section className={styles.content}>{data[selectedTabIdx][1]}</section>
    </>
  );
}

type Props = {
  data: [JSX.Element | string, JSX.Element][];
};
