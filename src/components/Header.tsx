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
      <label title="Daily pomo goal" className={styles.count}>
        {workIntervalCount >= workIntervalCountGoal && (
          <GrAchievement className={styles.icon} />
        )}
        {workIntervalCount} /{" "}
        <ContentEditable
          label="pomos"
          value={workIntervalCountGoal}
          onUpdateValue={(newGoal) => onUpdateGoal(newGoal)}
        >
          <>
            {workIntervalCountGoal === Infinity ? (
              <BsInfinity className={styles.infinity} />
            ) : (
              workIntervalCountGoal
            )}{" "}
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
