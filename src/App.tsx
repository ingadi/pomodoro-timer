import { useState } from "react";
import { useInterval, useDocumentTitle, useLocalStorage } from "usehooks-ts";
import { useIntervalData } from "@hooks/useIntervalData";
import SessionData from "@components/SessionData";
import IntervalSettings from "@components/IntervalSettings";
import Tabs from "@components/Tabs";
import Timers from "@components/Timers";
import Intervals from "@components/Intervals";
import AppControls, {
  SettingsControl,
  FullSreenControl,
} from "@components/AppControls";
import { PicInPicControl } from "@components/PicInPicControl";
import TimerControls from "@components/TimerConrols";
import YouTubeControl from "@components/YouTubeControl";
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

  const [intervalData, onIncrementIntervalData] = useIntervalData();
  const {
    work: { count: pomodoroCount },
  } = intervalData;

  const nextIntervalName = getNextIntervalName(
    currentIntervalName,
    pomodoroCount,
    pomodorosBeforeLongBreak,
    pomodoroGoal
  );

  const nextIntervalDuration = intervals[nextIntervalName];

  const [isTimerActive, setIsTimerActive] = useState(false);

  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const [isYouTubeActive, setIsYouTubeActive] = useState(false);

  const goalAchieved = pomodoroCount === pomodoroGoal && pomodoroGoal !== 0;

  useInterval(
    () => {
      if (currentTimer > 0) {
        setCurrentTimer((ct) => ct - 1);
        return;
      }

      onIncrementIntervalData(
        currentIntervalName,
        intervals[currentIntervalName]
      );
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
        <TimerControls
          isActive={isTimerActive}
          onStart={handleStartTimer}
          onPause={handlePauseTimer}
          onEnd={handleEndTimer}
        />
        <SessionData intervals={intervalData} goal={pomodoroGoal} />
        <AppControls>
          <>
            <YouTubeControl
              isActive={isYouTubeActive}
              intervalName={currentIntervalName}
              isTimerActive={isTimerActive}
              playListId={"PLt7bG0K25iXjy1L7Wpf6jgeEvMlwpNpqF"}
              onClick={() => setIsYouTubeActive(!isYouTubeActive)}
            />
            <PicInPicControl
              lines={[
                `${currentIntervalName.toLocaleUpperCase()}`,
                `${toformattedMinsSecs(currentTimer)}`,
              ]}
            />
            <FullSreenControl />
            <SettingsControl
              isActive={isSettingsVisible}
              onClick={() => {
                setIsTimerActive(false);
                setIsSettingsVisible(!isSettingsVisible);
              }}
            />
          </>
        </AppControls>
      </div>
      {isSettingsVisible && (
        <Modal title="Settings" onCancel={() => setIsSettingsVisible(false)}>
          <Tabs
            data={[
              [
                "Intervals",
                <>
                  <IntervalSettings
                    config={config}
                    onUpdate={(c) => {
                      setConfig(c);
                      currentIntervalName !== "work" &&
                        setCurrentIntervalName("work");
                      setCurrentTimer(c.intervals["work"]);
                    }}
                    onDone={() => setIsSettingsVisible(false)}
                  />
                </>,
              ],
              [
                "Second tab",
                <>
                  <h2>Second</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Repellendus itaque quidem minus nostrum, voluptatem
                    accusamus aspernatur quia harum ratione, officia laudantium
                    inventore autem doloribus atque labore numquam non. Hic,
                    animi.
                  </p>
                </>,
              ],
              [
                "Third tab",
                <>
                  <h2>Third</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Repellendus itaque quidem minus nostrum, voluptatem
                    accusamus aspernatur quia harum ratione, officia laudantium
                    inventore autem doloribus atque labore numquam non. Hic,
                    animi.
                  </p>
                </>,
              ],
            ]}
          />
          {/* <Settings
            config={config}
            onUpdate={(c) => {
              setConfig(c);
              currentIntervalName !== "work" && setCurrentIntervalName("work");
              setCurrentTimer(c.intervals["work"]);
            }}
            onDone={() => setIsSettingsVisible(false)}
          /> */}
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
