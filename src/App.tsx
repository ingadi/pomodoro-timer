import { useState } from "react";
import { useInterval, useDocumentTitle, useLocalStorage } from "usehooks-ts";
import { IoMdSettings } from "react-icons/io";
import { useIntervalsCount } from "@hooks/useIntervalsCount";
import Settings from "@components/Settings";
import IntervalTracker from "@components/IntervalTracker";
import Timers from "@components/Timers";
import Intervals from "@components/Intervals";
import Controls from "@components/Controls";
import TimerControls from "@components/TimerConrols";
import Modal from "@components/Modal";
import Background from "@components/Background";
import { toformattedMinsSecs, capitalize } from "@components/Timers";
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
    pomodoroGoal,
    pomodorosBeforeLongBreak,
    isAutoNextEnabled,
  } = config;

  const [currentIntervalName, setCurrentIntervalName] =
    useState<IntervalName>("work");

  const [currentTimer, setCurrentTimer] = useState(
    intervals[currentIntervalName]
  );

  const [intevalsCount, onIncrementIntervalsCount] = useIntervalsCount();
  const { work: pomodoroCount } = intevalsCount;

  const nextIntervalName = getNextIntervalName(
    currentIntervalName,
    pomodoroCount,
    pomodorosBeforeLongBreak,
    pomodoroGoal
  );

  const nextIntervalDuration = intervals[nextIntervalName];

  const [isTimerActive, setIsTimerActive] = useState(false);

  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const goalAchieved = pomodoroCount === pomodoroGoal && pomodoroGoal !== 0;

  useInterval(
    () => {
      if (currentTimer > 0) {
        setCurrentTimer((ct) => ct - 1);
        return;
      }

      onIncrementIntervalsCount(currentIntervalName);
      setCurrentIntervalName(nextIntervalName);
      setCurrentTimer(nextIntervalDuration);
      setIsTimerActive(isAutoNextEnabled && !goalAchieved);
      playChime(goalAchieved ? "goal achievement" : nextIntervalName);
    },
    isTimerActive ? 1000 : null
  );

  useDocumentTitle(
    `${toformattedMinsSecs(currentTimer)} | ${capitalize(currentIntervalName)}`
  );

  function handleSelectInterval(name: IntervalName) {
    setCurrentIntervalName(name);
    setCurrentTimer(intervals[name]);
    setIsTimerActive(false);
  }

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
      <Background
        name={`${goalAchieved && !isTimerActive ? "fireworks" : "squares"}`}
      />
      <div className={styles.wrapper}>
        <Intervals
          currentIntervalName={currentIntervalName}
          onSelecteInterval={handleSelectInterval}
        />
        <Timers
          currentTimerDuration={currentTimer}
          nextIntervalName={
            goalAchieved ? "goal achievement" : nextIntervalName
          }
          nextTimerDuration={nextIntervalDuration}
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
        <IntervalTracker intervals={intevalsCount} goal={pomodoroGoal} />
      </div>
      {isSettingsVisible && (
        <Modal>
          <Settings
            config={config}
            onUpdate={(c) => {
              setConfig(c);
              currentIntervalName !== "work" && setCurrentIntervalName("work");
              setCurrentTimer(c.intervals["work"]);
            }}
            onDone={() => setIsSettingsVisible(false)}
          />
        </Modal>
      )}
    </>
  );
}

function getNextIntervalName(
  currentIntervalName: string,
  pomodoroCount: number,
  pomodorosToLongBreak: number,
  pomodoroGoal: number
): IntervalName {
  if (currentIntervalName !== "work" || pomodoroCount + 1 === pomodoroGoal)
    return "work";

  return (pomodoroCount + 1) % pomodorosToLongBreak === 0
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
  "goal achievement": new Audio("./goal-achieved.ogg"),
  "start timer": new Audio("./start-timer.ogg"),
} as const;
