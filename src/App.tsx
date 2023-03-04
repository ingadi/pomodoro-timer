import { useState } from "react";
import Session from "@components/Session";
import styles from "./App.module.css";

export default function App() {
  const [currentSessionId, setCurrentSessionId] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const { duration, type } = sessions[currentSessionId];
  const upcomingSessions = sessions.filter((_, id) => id !== currentSessionId);

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>{type}</h1>
        <p className={styles.cycles}>{cycleCount} cycles</p>
      </header>

      <section className={styles.sessions}>
        <Session duration={duration} type={type} isActive={true} />
        <div>
          {upcomingSessions.map(({ duration, type }, idx) => (
            <Session
              key={idx}
              duration={duration}
              type={type}
              isActive={false}
            />
          ))}
        </div>
      </section>
      <div className={styles.controls}>
        <div className={styles.buttons}>
          <button className={styles.button}>Begin</button>
          <button className={styles.button}>End</button>
        </div>
        <div className={styles["toggle-wrapper"]}>
          <span className={styles["toggle-label"]}>Auto start</span>
          <input
            className={`${styles.tgl} ${styles["tgl-skewed"]}`}
            id="cb"
            type="checkbox"
          />
          <label
            className={styles["tgl-btn"]}
            data-tg-off="OFF"
            data-tg-on="ON"
            htmlFor="cb"
          ></label>
        </div>
      </div>
    </section>
  );
}

const sessions = [
  { duration: "45:00", type: "work" },
  { duration: "15:00", type: "short-break" },
  { duration: "30:00", type: "long-break" },
];
