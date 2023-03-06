import { useState } from "react";
import Session from "@components/Session";
import { useTimer } from "@hooks/useTimer";
import styles from "./App.module.css";

export default function App() {
  const [currentSessionId, setCurrentSessionId] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const { duration, type } = sessions[currentSessionId];
  const [isSessionActive, setIsSessionActive] = useState(false);
  const upcomingSessions = sessions.filter((_, id) => id !== currentSessionId);
  const [currentTimer, setCurrentTimer] = useState(duration);
  // const [isEditing, setIsEditing] = useState(false);
  const [isAutoNextEnabled, setIsAutoNextEnabled] = useState(false);

  useTimer(isSessionActive, onTick);

  function onTick() {
    setCurrentTimer((ct) => ct - 1);
  }

  function handleStartTimer() {
    if (isSessionActive) return;
    setIsSessionActive(true);
  }

  function handlePauseTimer() {
    if (!isSessionActive) return;
    setIsSessionActive(false);
  }

  function handleEndSession() {
    // TODO: Can only reset work if not work and next is checked we need to proceed to work
    if (!isSessionActive) return;
    setCurrentTimer(duration);
    setIsSessionActive(false);
  }

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>{type}</h1>
        <p className={styles.cycles}>{cycleCount} / &infin; cycles</p>
      </header>

      <section className={styles.sessions}>
        <Session
          duration={currentTimer}
          type={type}
          isActive={true}
          // isEditing={isEditing}
          // onEdit={(isEditing) => setIsEditing(isEditing)}
        />
        <div>
          {upcomingSessions.map(({ duration, type }, idx) => (
            <Session
              key={idx}
              duration={duration}
              type={type}
              isActive={false}
              // isEditing={isEditing}
              // onEdit={(isEditing) => setIsEditing(isEditing)}
            />
          ))}
        </div>
      </section>
      <div className={styles.controls}>
        <div className={styles.buttons}>
          {!isSessionActive ? (
            <button onClick={handleStartTimer} className={styles.button}>
              {currentTimer < duration ? "Continue" : "Start"}
            </button>
          ) : (
            <button onClick={handlePauseTimer} className={styles.button}>
              Pause
            </button>
          )}

          <button onClick={handleEndSession} className={styles.button}>
            End
          </button>
        </div>
        <div className={styles["toggle-wrapper"]}>
          <span className={styles["toggle-label"]}>Auto next</span>
          <input
            className={`${styles.tgl} ${styles["tgl-skewed"]}`}
            id="cb"
            type="checkbox"
            checked={isAutoNextEnabled}
            onChange={() => setIsAutoNextEnabled(!isAutoNextEnabled)}
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
  { duration: 2700, type: "work" },
  { duration: 900, type: "short-break" },
  { duration: 1800, type: "long-break" },
];
