import { AiOutlineTrophy } from "react-icons/ai";
import { BsInfinity } from "react-icons/bs";
import styles from "./IntervalTracker.module.css";

export default function IntervalTracker({ intervals, goal }: Props) {
  const { work } = intervals;
  const shortBreak = intervals["short break"];
  const longBreak = intervals["long break"];

  return (
    <details className={styles.pomodoro}>
      <summary className={styles.wrapper}>
        <span className={styles.summary}>
          {work >= goal && goal !== 0 && (
            <AiOutlineTrophy
              title="Daily goal achieved"
              className={`${styles.trophy} ${styles.tooltip} ${
                work === goal ? styles.wiggle : ""
              }`}
            />
          )}
          <span
            className={`${styles["work-interval-count"]} ${styles.tooltip}`}
            title="Today's completed pomodoros"
          >
            {work}
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
      <p className={styles.intervals}>
        <span className={styles.interval}>{pluralize(work, "Pomodoro")}</span>
        <span className={styles.interval}>
          {pluralize(shortBreak, "Short break")}
        </span>
        <span className={styles.interval}>
          {pluralize(longBreak, "Long break")}
        </span>
      </p>
    </details>
  );
}

function pluralize(count: number, noun: string, suffix = "s") {
  return `${count} ${noun}${count !== 1 ? suffix : ""}`;
}

type Props = {
  intervals: { [key: string]: number };
  goal: number;
};
