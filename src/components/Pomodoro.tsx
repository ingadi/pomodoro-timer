import { AiOutlineTrophy } from "react-icons/ai";
import { BsInfinity } from "react-icons/bs";
import styles from "./Pomodoro.module.css";

export default function Pomodoro({ count, goal }: Props) {
  return (
    <details className={styles.pomodoro}>
      <summary className={styles.wrapper}>
        <span className={styles.summary}>
          {count >= goal && goal !== 0 && (
            <AiOutlineTrophy
              title="Daily goal achieved"
              className={`${styles.trophy} ${styles.tooltip} ${
                count === goal ? styles.wiggle : ""
              }`}
            />
          )}
          <span
            className={`${styles["work-interval-count"]} ${styles.tooltip}`}
            title="Today's completed pomodoros"
          >
            {count}
          </span>
          /
          {goal === 0 ? (
            <BsInfinity className={styles.tooltip} title="Daily goal not set" />
          ) : (
            <span className={styles.tooltip} title="Daily goal">
              {goal}
            </span>
          )}
          pomos
        </span>
      </summary>
      <p className={styles.intervals}>
        <span className={styles.interval}>1 Pomodoro</span>
        <span className={styles.interval}>1 Short break</span>
        <span className={styles.interval}>0 Long break</span>
      </p>
    </details>
  );
}

type Props = {
  count: number;
  goal: number;
};
