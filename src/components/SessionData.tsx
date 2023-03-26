import { AiOutlineTrophy } from "react-icons/ai";
import { BsInfinity } from "react-icons/bs";
import { IntervalData } from "@hooks/useIntervalData";
import styles from "./SessionData.module.css";

export default function SessionData({ intervals, goal }: Props) {
  const { work } = intervals;
  const shortBreak = intervals["short break"];
  const longBreak = intervals["long break"];

  return (
    <details className={styles.pomodoro}>
      <summary className={styles.wrapper}>
        <span className={styles.summary}>
          {work.count >= goal && goal !== 0 && (
            <AiOutlineTrophy
              title="Daily goal achieved"
              className={`${styles.trophy} ${styles.tooltip} ${
                work.count === goal ? styles.wiggle : ""
              }`}
            />
          )}
          <span
            className={`${styles["work-interval-count"]} ${styles.tooltip}`}
            title="Today's completed pomodoros"
          >
            {work.count}
          </span>
          /
          {goal === 0 ? (
            <BsInfinity className={styles.tooltip} title="Daily goal not set" />
          ) : (
            <span className={styles.tooltip} title="Daily goal">
              {goal}
            </span>
          )}
          pomodoros
        </span>
      </summary>
      <div className={styles.intervals}>
        <p className={styles.interval}>
          <span className={styles.count}>
            {toPlural(work.count, "Pomodoro")}
          </span>
          <span className={styles.duration}>{toHrsMins(work.duration)}</span>
        </p>
        <p className={styles.interval}>
          <span className={styles.count}>
            {toPlural(shortBreak.count, "Short break")}
          </span>
          <span className={styles.duration}>
            {toHrsMins(shortBreak.duration)}
          </span>
        </p>
        <p className={styles.interval}>
          <span className={styles.count}>
            {toPlural(longBreak.count, "Long break")}
          </span>
          <span className={styles.duration}>
            {toHrsMins(longBreak.duration)}
          </span>
        </p>
      </div>
    </details>
  );
}

function toPlural(count: number, noun: string, suffix = "s") {
  return `${count} ${noun}${count !== 1 ? suffix : ""}`;
}

function toHrsMins(duration: number) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor(duration / 60);

  return `${hours > 0 ? toPlural(hours, "hour") : ""} ${
    hours > 0 && minutes < 1 ? "" : toPlural(minutes, "minute")
  }`;
}

type Props = {
  intervals: IntervalData;
  goal: number;
};
