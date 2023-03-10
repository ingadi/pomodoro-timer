import { useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@hooks/useWindowSize";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useTimer } from "@hooks/useTimer";
import Intervals from "@components/Intervals";
import Header from "@components/Header";
import Controls from "@components/Controls";
import TimerControls from "@components/TimerConrols";
import styles from "./App.module.css";

export default function App() {
  const [
    {
      intervals,
      workIntervalCountGoal,
      workIntervalsToLongBreak,
      isAutoNextEnabled,
    },
    setConfig,
  ] = useLocalStorage<Config>("pomodoro-config", initialConfig);

  const [currentIntervalName, setCurrentIntervalName] =
    useState<IntervalName>("work");

  const currentIntervalDuration = intervals[currentIntervalName];
  const [currentTimer, setCurrentTimer] = useState(currentIntervalDuration);

  const [workIntervalCount, setWorkIntervalCount] = useState(3);

  const nextIntervalName = getNextIntervalName(
    currentIntervalName,
    workIntervalCount,
    workIntervalsToLongBreak,
    workIntervalCountGoal
  );

  const nextIntervalDuration = intervals[nextIntervalName];

  const [isTimerActive, setIsTimerActive] = useState(false);

  useTimer(isTimerActive, () => {
    if (currentTimer > 0) {
      setCurrentTimer((ct) => ct - 1);
      return;
    }

    currentIntervalName === "work" && setWorkIntervalCount((wic) => wic + 1);

    setCurrentIntervalName(nextIntervalName);
    setCurrentTimer(nextIntervalDuration);

    chimes[
      workIntervalCount + 1 === workIntervalCountGoal
        ? "goal achieved"
        : nextIntervalName
    ].play();
  });

  function handleStartTimer() {
    if (isTimerActive) return;
    setIsTimerActive(true);
  }

  function handlePauseTimer() {
    if (!isTimerActive) return;
    setIsTimerActive(false);
  }

  function handleEndTimer() {
    if (!isTimerActive) return;
    currentIntervalName !== "work" && setCurrentIntervalName("work");
    setCurrentTimer(intervals["work"]);
    !isAutoNextEnabled && setIsTimerActive(false);
  }

  return (
    <div className={styles.wrapper}>
      <Header
        workIntervalCount={workIntervalCount}
        workIntervalCountGoal={workIntervalCountGoal}
        currentIntervalName={currentIntervalName}
        onUpdateWorkIntervalCount={(value) => setWorkIntervalCount(value)}
      />
      <Intervals
        currentIntervalDuration={currentTimer}
        nextInterval={{
          name: nextIntervalName,
          duration: nextIntervalDuration,
        }}
        isAutoNextEnabled={isAutoNextEnabled}
      />
      <Controls>
        <>
          <TimerControls
            isActive={isTimerActive}
            onStart={handleStartTimer}
            onPause={handlePauseTimer}
            onEnd={handleEndTimer}
          />
        </>
      </Controls>
    </div>
  );
}

// export default function App() {

//   const [currentSessionType, setCurrentSessionType] = useState("work");

//   const [cycleCount, setCycleCount] = useState(0);

//   const { duration, type } = sessions.get(currentSessionType)!;

//   const [isSessionActive, setIsSessionActive] = useState(false);

//   const [currentTimer, setCurrentTimer] = useState(duration);
//   const [isAutoNextEnabled, setIsAutoNextEnabled] = useState(false);

//   const [cyclesToLongBreak, setCyclesToLongBreak] = useState(4);

//   const [cycleCountGoal, setCycleCountGoal] = useState(2);

//   const { width, height } = useWindowSize();

//   console.log({
//     intervals,
//     cycleCountGoal,
//     cyclesToLongBreak,
//     isAutoNextEnabled,
//   });

//   // TODO: order sessions appropriately
//   const upcomingSessions = [...sessions.values()].filter(
//     ({ type: t }) => t !== type
//   );

//   useTimer(isSessionActive, onTick);

//   function onTick() {
//     if (currentTimer > 0) {
//       setCurrentTimer((ct) => ct - 1);
//       return;
//     }

//     let nextSessionType;

//     if (type === "work") {
//       setCycleCount(cycleCount + 1);
//       nextSessionType = cycleCount + 1 === cycleCountGoal ? "work" : undefined;
//     }

//     handleNextSession(nextSessionType);
//   }

//   function handleStartTimer() {
//     if (isSessionActive) return;
//     setIsSessionActive(true);
//   }

//   function handlePauseTimer() {
//     if (!isSessionActive) return;
//     setIsSessionActive(false);
//   }

//   function handleNextSession(nextSessionType?: string) {
//     const nextSession = nextSessionType
//       ? sessions.get(nextSessionType)!
//       : getNextSession(type, cycleCount, cyclesToLongBreak, sessions);

//     setCurrentSessionType(nextSession.type);
//     setCurrentTimer(nextSession.duration);

//     const goalAchieved = type === "work" && cycleCount + 1 === cycleCountGoal;

//     (!isAutoNextEnabled || goalAchieved) && setIsSessionActive(false);

//     handlePlayChime(nextSession.type);
//   }

//   function handlePlayChime(nextSessionType: string) {
//     let chime = nextSessionType === "work" ? chimes["work"] : chimes["break"];
//     if (type === "work" && cycleCount + 1 === cycleCountGoal) {
//       chime = chimes["goalAchieved"];
//     }
//     chime.play();
//   }

//   function handleEndSession() {
//     if (type === "work") {
//       setCurrentTimer(duration);
//       setIsSessionActive(false);
//     } else {
//       handleNextSession("work");
//     }
//   }

//   return (
//     <>
//       {cycleCount === cycleCountGoal && (
//         <Confetti width={width} height={height} />
//       )}
//       <section className={styles.wrapper}>
//         <Header
//           cycleCount={cycleCount}
//           cycleCountGoal={cycleCountGoal}
//           type={type}
//           onUpdateCycleGoal={(value) => setCycleCountGoal(value)}
//         />

//         <section className={styles.sessions}>
//           <Interval duration={currentTimer} type={type} isActive={true} />
//           <div>
//             {upcomingSessions.map(({ duration, type }, idx) => (
//               <Interval
//                 key={idx}
//                 duration={duration}
//                 type={type}
//                 isActive={false}
//               />
//             ))}
//           </div>
//         </section>
//         <div className={styles.controls}>
//           <div className={styles.buttons}>
//             {!isSessionActive ? (
//               <button onClick={handleStartTimer} className={styles.button}>
//                 {currentTimer < duration ? "Continue" : "Start"}
//               </button>
//             ) : (
//               <button onClick={handlePauseTimer} className={styles.button}>
//                 Pause
//               </button>
//             )}

//             <button onClick={handleEndSession} className={styles.button}>
//               End
//             </button>
//           </div>
//           <div>
//             {/* <label className={styles["text-controls"]} htmlFor="">
//               Long break every
//               <span> {cyclesToLongBreak} cycles</span>
//               <input type="text" />
//             </label> */}
//             <div className={styles["toggle-wrapper"]}>
//               <span className={styles["toggle-label"]}>Auto next</span>
//               <input
//                 className={`${styles.tgl} ${styles["tgl-skewed"]}`}
//                 id="cb"
//                 type="checkbox"
//                 checked={isAutoNextEnabled}
//                 onChange={() => setIsAutoNextEnabled(!isAutoNextEnabled)}
//               />
//               <label
//                 className={styles["tgl-btn"]}
//                 data-tg-off="OFF"
//                 data-tg-on="ON"
//                 htmlFor="cb"
//               ></label>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

function getNextIntervalName(
  currentIntervalName: string,
  workIntervalCount: number,
  workIntervalsToLongBreak: number,
  workIntervalCountGoal: number
): IntervalName {
  if (currentIntervalName !== "work") return "work";

  if (workIntervalCount + 1 === workIntervalCountGoal) return "goal achieved";

  return (workIntervalCount + 1) % workIntervalsToLongBreak === 0
    ? "long break"
    : "short break";
}

const intervals = {
  work: 10,
  "short break": 5,
  "long break": 1800,
  "goal achieved": 0,
};

const initialConfig = {
  intervals,
  workIntervalCountGoal: 4,
  isAutoNextEnabled: false,
  workIntervalsToLongBreak: 4,
};

const chimes = {
  "long break": new Audio("./break-start.ogg"),
  "short break": new Audio("./break-start.ogg"),
  work: new Audio("./break-end.ogg"),
  "goal achieved": new Audio("./goal-achieved.ogg"),
};

type IntervalName = "work" | "short break" | "long break" | "goal achieved";

type Config = {
  intervals: { [key: string]: number };
  workIntervalCountGoal: number;
  isAutoNextEnabled: boolean;
  workIntervalsToLongBreak: number;
};
