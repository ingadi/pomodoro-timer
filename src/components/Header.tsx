import { AiOutlineTrophy } from "react-icons/ai";
import { BsInfinity } from "react-icons/bs";
import styles from "./Header.module.css";

export default function Header({
  workIntervalCount,
  workIntervalCountGoal,
  currentIntervalName,
}: Props) {
  return (
    <header>
      <h1 title="Current interval" className={styles.title}>
        {currentIntervalName}
      </h1>
      <Pomodoro
        workIntervalCount={workIntervalCount}
        workIntervalCountGoal={workIntervalCountGoal}
      />
      {/* <div className={styles.pomos}>
        {workIntervalCount >= workIntervalCountGoal &&
          workIntervalCountGoal !== 0 && (
            <AiOutlineTrophy
              title="Daily goal achieved"
              className={`${styles.trophy} ${styles.tooltip} ${
                workIntervalCount === workIntervalCountGoal ? styles.wiggle : ""
              }`}
            />
          )}
        <span
          className={`${styles["work-interval-count"]} ${styles.tooltip}`}
          title="Today's completed pomodoros"
        >
          {workIntervalCount}
        </span>
        /
        {workIntervalCountGoal === 0 ? (
          <BsInfinity className={styles.tooltip} title="Daily goal not set" />
        ) : (
          <span className={styles.tooltip} title="Daily goal">
            {workIntervalCountGoal}
          </span>
        )}
        pomodoro
      </div> */}
    </header>
  );
}

function Pomodoro({ workIntervalCount, workIntervalCountGoal }: PomodoroProps) {
  return (
    <div className={styles.pomos}>
      {workIntervalCount >= workIntervalCountGoal &&
        workIntervalCountGoal !== 0 && (
          <AiOutlineTrophy
            title="Daily goal achieved"
            className={`${styles.trophy} ${styles.tooltip} ${
              workIntervalCount === workIntervalCountGoal ? styles.wiggle : ""
            }`}
          />
        )}
      <span
        className={`${styles["work-interval-count"]} ${styles.tooltip}`}
        title="Today's completed pomodoros"
      >
        {workIntervalCount}
      </span>
      /
      {workIntervalCountGoal === 0 ? (
        <BsInfinity className={styles.tooltip} title="Daily goal not set" />
      ) : (
        <span className={styles.tooltip} title="Daily goal">
          {workIntervalCountGoal}
        </span>
      )}
      pomos
    </div>
  );
}

type PomodoroProps = {
  workIntervalCount: number;
  workIntervalCountGoal: number;
};

type Props = {
  workIntervalCount: number;
  workIntervalCountGoal: number;
  currentIntervalName: string;
};
