import { BsCupHot, BsPersonWorkspace } from "react-icons/bs";
import { TbBed } from "react-icons/tb";
import { VscSync, VscSyncIgnored } from "react-icons/vsc";
import styles from "./Intervals.module.css";

export default function Intervals({
  currentIntervalDuration,
  nextInterval,
  isAutoNextEnabled,
}: IntervalsProps) {
  return (
    <section className={styles.intervals}>
      <div className={styles["interval-active"]}>
        <Interval duration={currentIntervalDuration} />
      </div>
      <div className={styles["interval-inactive"]}>
        <b
          title={`Auto next ${isAutoNextEnabled ? "enabled" : "disabled"}`}
          className={styles["up-next"]}
        >
          Up next {isAutoNextEnabled ? <VscSync /> : <VscSyncIgnored />}
        </b>
        <div title={capitalize(nextInterval.name)} className={styles.interval}>
          <span className={styles.icon}>{icons[nextInterval.name]}</span>
          <Interval duration={nextInterval.duration} />
        </div>
      </div>
    </section>
  );
}

function Interval({ duration }: IntervalProps) {
  return <>{toformattedMinsSecs(duration)}</>;
}

function toformattedMinsSecs(totalSeconds: number) {
  const minutes = `${Math.floor(totalSeconds / 60)}`;
  const seconds = `${totalSeconds % 60}`;
  return `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
}

function capitalize(str: string) {
  return `${str.charAt(0).toUpperCase() + str.slice(1)}`;
}

const icons = {
  work: <BsPersonWorkspace />,
  "short break": <BsCupHot />,
  "long break": <TbBed />,
};

type IntervalsProps = {
  currentIntervalDuration: number;
  nextInterval: { name: IntervalName; duration: number };
  isAutoNextEnabled: boolean;
};

type IntervalProps = {
  duration: number;
};

type IntervalName = "work" | "short break" | "long break";
