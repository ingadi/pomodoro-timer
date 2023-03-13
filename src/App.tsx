import { useState } from "react";
import Confetti from "react-confetti";
import { IoMdSettings } from "react-icons/io";
import { useWindowSize } from "@hooks/useWindowSize";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useTimer } from "@hooks/useTimer";
import Settings from "@components/Settings";
import Intervals from "@components/Intervals";
import Header from "@components/Header";
import Controls from "@components/Controls";
import TimerControls from "@components/TimerConrols";
import Modal from "@components/Modal";
import styles from "./App.module.css";

export default function App() {
  const [config, setConfig] = useLocalStorage<Config>(
    "pomodoro-config",
    initialConfig
  );

  const {
    intervals,
    workIntervalCountGoal,
    workIntervalsToLongBreak,
    isAutoNextEnabled,
  } = config;

  // TODO: Steal button animation from nesto.cc to apply to trophy
  // TODO: Add sound on click start button
  // TODO: use local storage to retrieve and reset daily pomodoro
  // TODO: make peer to peer for study sessions sync settings

  const [currentIntervalName, setCurrentIntervalName] =
    useState<IntervalName>("work");

  const currentIntervalDuration = intervals[currentIntervalName];
  const [currentTimer, setCurrentTimer] = useState(currentIntervalDuration);

  const [workIntervalCount, setWorkIntervalCount] = useState(2);

  const nextIntervalName = getNextIntervalName(
    currentIntervalName,
    workIntervalCount,
    workIntervalsToLongBreak,
    workIntervalCountGoal
  );

  const nextIntervalDuration = intervals[nextIntervalName];

  const [isTimerActive, setIsTimerActive] = useState(false);

  const { width, height } = useWindowSize();

  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  useTimer(isTimerActive, () => {
    if (currentTimer > 0) {
      setCurrentTimer((ct) => ct - 1);
      return;
    }

    currentIntervalName === "work" && setWorkIntervalCount((wic) => wic + 1);

    // skip ahead to work if current interval is goal achieved
    const duration =
      nextIntervalName === "goal achieved"
        ? intervals["work"]
        : nextIntervalDuration;

    const name =
      nextIntervalName === "goal achieved" ? "work" : nextIntervalName;

    setCurrentIntervalName(name);
    setCurrentTimer(duration);

    setIsTimerActive(
      isAutoNextEnabled && !(nextIntervalName === "goal achieved")
    );

    chimes[nextIntervalName].load();
    chimes[nextIntervalName].play();
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
    currentIntervalName !== "work" && setCurrentIntervalName("work");
    setCurrentTimer(intervals["work"]);
    setIsTimerActive(isAutoNextEnabled && currentIntervalName !== "work");
  }

  return (
    <>
      {workIntervalCount === workIntervalCountGoal && !isTimerActive && (
        <Confetti width={width} height={height} />
      )}
      <div className={styles.wrapper}>
        <Header
          workIntervalCount={workIntervalCount}
          workIntervalCountGoal={workIntervalCountGoal}
          currentIntervalName={currentIntervalName}
          onUpdateGoal={(goal) => {
            console.log(goal);
          }}
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
            <button onClick={() => setIsSettingsVisible(true)}>
              <IoMdSettings />
            </button>
          </>
        </Controls>
      </div>
      <Modal
        isOpen={isSettingsVisible}
        // onClose={() => setIsSettingsVisible(false)}
      >
        <Settings
          config={config}
          // TODO: update timer states
          onUpdate={(s) => {
            setConfig(s);
            currentIntervalName !== "work" && setCurrentIntervalName("work");
            setCurrentTimer(s.intervals["work"]);
          }}
          onDone={() => setIsSettingsVisible(false)}
        />
      </Modal>
    </>
  );
}

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
  isAutoNextEnabled: true,
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
