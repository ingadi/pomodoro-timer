import { useState } from "react";
import Session from "@components/Session";
import { useTimer } from "@hooks/useTimer";
import styles from "./App.module.css";
import { useWindowSize } from "@hooks/useWindowSize";
import { Header } from "@components/Header";
import Confetti from "react-confetti";

export default function App() {
  const [currentSessionType, setCurrentSessionType] = useState("work");
  const [cycleCount, setCycleCount] = useState(0);

  const { duration, type } = sessions.get(currentSessionType)!;

  const [isSessionActive, setIsSessionActive] = useState(false);

  const [currentTimer, setCurrentTimer] = useState(duration);
  const [isAutoNextEnabled, setIsAutoNextEnabled] = useState(false);

  const [cyclesToLongBreak, setCyclesToLongBreak] = useState(4);

  const [cycleCountGoal, setCycleCountGoal] = useState(2);

  const { width, height } = useWindowSize();

  // TODO: order sessions appropriately
  const upcomingSessions = [...sessions.values()].filter(
    ({ type: t }) => t !== type
  );

  // const [isEditing, setIsEditing] = useState(false);

  useTimer(isSessionActive, onTick);

  function onTick() {
    if (currentTimer > 0) {
      setCurrentTimer((ct) => ct - 1);
      return;
    }

    let nextSessionType;

    if (type === "work") {
      setCycleCount(cycleCount + 1);
      nextSessionType = cycleCount + 1 === cycleCountGoal ? "work" : undefined;
    }

    handleNextSession(nextSessionType);
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
      : getNextSession(type, cycleCount, cyclesToLongBreak, sessions);

    setCurrentSessionType(nextSession.type);
    setCurrentTimer(nextSession.duration);

    const goalAchieved = type === "work" && cycleCount + 1 === cycleCountGoal;

    (!isAutoNextEnabled || goalAchieved) && setIsSessionActive(false);

    handlePlayChime(nextSession.type);
  }

  function handlePlayChime(nextSessionType: string) {
    let chime = nextSessionType === "work" ? chimes["work"] : chimes["break"];
    if (type === "work" && cycleCount + 1 === cycleCountGoal) {
      chime = chimes["goalAchieved"];
    }
    chime.play();
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
    <>
      {cycleCount === cycleCountGoal && (
        <Confetti width={width} height={height} />
      )}
      <section className={styles.wrapper}>
        <Header
          cycleCount={cycleCount}
          cycleCountGoal={cycleCountGoal}
          type={type}
        />

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
            {/* <label className={styles["text-controls"]} htmlFor="">
              Long break every
              <span> {cyclesToLongBreak} cycles</span>
              <input type="text" />
            </label> */}
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
    </>
  );
}

function getNextSession(
  sessionType: string,
  cycleCount: number,
  cycleCountToLongBreak: number,
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
      cycleCount < cycleCountToLongBreak
        ? sessions.get("short break")!
        : sessions.get("long break")!;
  } else {
    nextSession = sessions.get("work")!;
  }

  return nextSession;
}

const sessions = new Map<string, { duration: number; type: string }>([
  ["work", { duration: 5, type: "work" }],
  ["short break", { duration: 5, type: "short break" }],
  ["long break", { duration: 1800, type: "long break" }],
]);

const chimes = {
  break: new Audio("./break-start.ogg"),
  work: new Audio("./break-end.ogg"),
  goalAchieved: new Audio("./goal-achieved.ogg"),
};
