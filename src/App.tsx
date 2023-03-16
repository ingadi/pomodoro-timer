import { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useTitle } from "@hooks/useTitle";
import { useTimer } from "@hooks/useTimer";
import Settings from "@components/Settings";
import Intervals from "@components/Intervals";
import Header from "@components/Header";
import Controls from "@components/Controls";
import TimerControls from "@components/TimerConrols";
import Modal from "@components/Modal";
import Background from "@components/Background";
import { toformattedMinsSecs, capitalize } from "@components/Intervals";
import { defaultConfig } from "@constants";
import { Config, IntervalName } from "@types";
import styles from "./App.module.css";

export default function App() {
  const [config, setConfig] = useLocalStorage<Config>(
    "pomodoro-config",
    defaultConfig
  );

  const {
    intervals,
    workIntervalCountGoal,
    workIntervalsToLongBreak,
    isAutoNextEnabled,
  } = config;

  // TODO: Remove content editable component
  // TODO: use local storage to retrieve and reset daily pomodoro
  // TODO: make peer to peer for study sessions sync settings

  const [currentIntervalName, setCurrentIntervalName] =
    useState<IntervalName>("work");

  const currentIntervalDuration = intervals[currentIntervalName];
  const [currentTimer, setCurrentTimer] = useState(currentIntervalDuration);

  const [workIntervalCount, setWorkIntervalCount] = useState(0);

  const nextIntervalName = getNextIntervalName(
    currentIntervalName,
    workIntervalCount,
    workIntervalsToLongBreak,
    workIntervalCountGoal
  );

  const nextIntervalDuration = intervals[nextIntervalName];

  const [isTimerActive, setIsTimerActive] = useState(false);

  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const goalAchieved =
    workIntervalCount === workIntervalCountGoal && workIntervalCountGoal !== 0;

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

    playChime(nextIntervalName);
  });

  useTitle(
    `${toformattedMinsSecs(currentTimer)} | ${capitalize(currentIntervalName)}`
  );

  function handleStartTimer() {
    if (isTimerActive) return;
    setIsTimerActive(true);
    playChime("start timer");
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
      <Background name={`${goalAchieved ? "fireworks" : "squares"}`} />
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
            <button
              className={styles.settings}
              onClick={() => {
                setIsTimerActive(false);
                setIsSettingsVisible(true);
              }}
            >
              <IoMdSettings />
            </button>
          </>
        </Controls>
      </div>
      <Modal isOpen={isSettingsVisible}>
        <Settings
          config={config}
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

function playChime(name: keyof typeof chimes) {
  chimes[name].load();
  chimes[name].play();
}

const chimes = {
  "long break": new Audio("./break-start.ogg"),
  "short break": new Audio("./break-start.ogg"),
  work: new Audio("./break-end.ogg"),
  "goal achieved": new Audio("./goal-achieved.ogg"),
  "start timer": new Audio("./start-timer.ogg"),
} as const;
