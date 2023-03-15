import { GrAchievement } from "react-icons/gr";
import { BsInfinity } from "react-icons/bs";
import { ContentEditable } from "@components/ContentEditable";
import styles from "./Header.module.css";

export default function Header({
  workIntervalCount,
  workIntervalCountGoal,
  currentIntervalName,
  onUpdateGoal,
}: Props) {
  return (
    <header className={styles.header}>
      <h1 title="Current interval" className={styles.title}>
        {currentIntervalName}
      </h1>
      <label className={styles["pomo-count"]}>
        {workIntervalCount >= workIntervalCountGoal &&
          workIntervalCountGoal !== 0 && (
            <GrAchievement
              title="Daily pomo goal achieved"
              className={`${styles.icon} ${
                workIntervalCount === workIntervalCountGoal ? styles.wiggle : ""
              }`}
            />
          )}
        <span className={styles["work-interval-count"]} title="Completed pomos">
          {workIntervalCount}
        </span>{" "}
        /{" "}
        <ContentEditable
          label="pomos"
          value={workIntervalCountGoal}
          onUpdateValue={(newGoal) => onUpdateGoal(newGoal)}
        >
          <>
            <span className={styles["pomo-goal"]} title="Daily pomo goal">
              {workIntervalCountGoal === 0 ? (
                <BsInfinity className={styles.infinity} />
              ) : (
                workIntervalCountGoal
              )}{" "}
            </span>
            pomos
          </>
        </ContentEditable>
      </label>
    </header>
  );
}

type Props = {
  workIntervalCount: number;
  workIntervalCountGoal: number;
  currentIntervalName: string;
  onUpdateGoal: (goal: number) => void;
};

// Ꝏ
