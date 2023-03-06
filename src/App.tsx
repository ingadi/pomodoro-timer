import { useState } from "react";
import Session from "@components/Session";
import { useTimer } from "@hooks/useTimer";
import styles from "./App.module.css";

export default function App() {
  const [currentSessionType, setCurrentSessionType] = useState("work");
  const [cycleCount, setCycleCount] = useState(0);

  const { duration, type } = sessions.get(currentSessionType)!;

  const [isSessionActive, setIsSessionActive] = useState(false);

  // TODO: order sessions appropriately
  const upcomingSessions = [...sessions.values()].filter(
    ({ type: t }) => t !== type
  );

  const [currentTimer, setCurrentTimer] = useState(duration);
  const [isAutoNextEnabled, setIsAutoNextEnabled] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);

  useTimer(isSessionActive, onTick);

  function onTick() {
    if (currentTimer > 0) {
      setCurrentTimer((ct) => ct - 1);
      return;
    }

    type === "work" && setCycleCount(cycleCount + 1);

    handleNextSession();

    // add chimes
  }

  function handleStartTimer() {
    if (isSessionActive) return;
    setIsSessionActive(true);
  }

  function handlePauseTimer() {
    if (!isSessionActive) return;
    setIsSessionActive(false);
  }

  function handleNextSession(nextSessionType?: string) {
    const nextSession = nextSessionType
      ? sessions.get(nextSessionType)!
      : getNextSession(type, cycleCount, sessions);

    setCurrentSessionType(nextSession.type);
    setCurrentTimer(nextSession.duration);
    !isAutoNextEnabled && setIsSessionActive(false);

    // const chime = nextSession.type === "work" ? breakEndChime : breakEndChime;
    // chime.load();
    // chime.play();
  }

  function handleEndSession() {
    if (type === "work") {
      setCurrentTimer(duration);
      setIsSessionActive(false);
    } else {
      handleNextSession("work");
    }
  }

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>{type}</h1>
        <label className={styles.cycles}>
          {cycleCount} / <span> &infin; cycles</span>
          {/* <input type="text" /> */}
        </label>
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
        <div>
          <label className={styles["text-controls"]} htmlFor="">
            Long break every
            <span> 4 cycles</span>
            {/* <input type="text" /> */}
          </label>
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
      </div>
    </section>
  );
}

function getNextSession(
  sessionType: string,
  cycleCount: number,
  sessions: Map<
    string,
    {
      duration: number;
      type: string;
    }
  >
) {
  let nextSession;

  if (sessionType === "work") {
    nextSession =
      cycleCount < 4
        ? sessions.get("short break")!
        : sessions.get("long break")!;
  } else {
    nextSession = sessions.get("work")!;
  }

  return nextSession;
}

const sessions = new Map<string, { duration: number; type: string }>([
  ["work", { duration: 10, type: "work" }],
  ["short break", { duration: 900, type: "short break" }],
  ["long break", { duration: 1800, type: "long break" }],
]);

const breakStartChime = new Audio();
const breakEndChime = new Audio();
