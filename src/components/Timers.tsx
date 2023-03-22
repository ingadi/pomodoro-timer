import { BsCupHot } from "react-icons/bs";
import { FaLaptopCode } from "react-icons/fa";
import { SlGameController } from "react-icons/sl";
import { FiSkipForward, FiFastForward } from "react-icons/fi";
import { GiPartyPopper } from "react-icons/gi";
import { IntervalName } from "@types";
import styles from "./Timers.module.css";

export default function Timers({
  currentTimerDuration,
  nextIntervalName,
  isAutoNextEnabled,
  nextTimerDuration,
}: TimersProps) {
  return (
    <section className={styles.timers}>
      <div className={styles["timer-active"]}>
        <Timer duration={currentTimerDuration} />
      </div>
      <div className={styles["timer-inactive"]}>
        <b className={styles["up-next"]}>
          Up next
          <span
            className={styles["auto-next"]}
            title={`Auto next ${isAutoNextEnabled ? "on" : "off"}`}
          >
            {isAutoNextEnabled ? <FiFastForward /> : <FiSkipForward />}
          </span>
        </b>
        <div title={capitalize(nextIntervalName)} className={styles.timer}>
          <i>{icons[nextIntervalName]}</i>
          {nextIntervalName === "goal achievement" ? (
            <small>End</small>
          ) : (
            <Timer duration={nextTimerDuration} />
          )}
        </div>
      </div>
    </section>
  );
}

// TODO: Extract upnext into own component

function Timer({ duration }: TimerProps) {
  return <>{toformattedMinsSecs(duration)}</>;
}

export function toformattedMinsSecs(totalSeconds: number) {
  const minutes = `${Math.floor(totalSeconds / 60)}`;
  const seconds = `${totalSeconds % 60}`;
  return `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
}

export function capitalize(str: string) {
  return `${str.charAt(0).toUpperCase() + str.slice(1)}`;
}

const icons = {
  work: <FaLaptopCode />,
  "short break": <BsCupHot />,
  "long break": <SlGameController />,
  "goal achievement": <GiPartyPopper />,
};

type TimersProps = {
  currentTimerDuration: number;
  nextIntervalName: IntervalName | "goal achievement";
  nextTimerDuration: number;
  isAutoNextEnabled: boolean;
};

type TimerProps = {
  duration: number;
};
