import { GrAchievement } from "react-icons/gr";
import { BsInfinity } from "react-icons/bs";
import { ContentEditable } from "@components/ContentEditable";
import styles from "./Header.module.css";

export default function Header({
  workIntervalCount,
  workIntervalCountGoal,
  currentIntervalName,
  onUpdateWorkIntervalCount,
}: Props) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{currentIntervalName}</h1>
      <label title="Daily pomo goal" className={styles.count}>
        {workIntervalCount >= workIntervalCountGoal && (
          <GrAchievement className={styles.icon} />
        )}
        {workIntervalCount} /{" "}
        <ContentEditable
          label="pomos"
          value={workIntervalCountGoal}
          onUpdateValue={(newCountGoal) =>
            onUpdateWorkIntervalCount(newCountGoal)
          }
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
  onUpdateWorkIntervalCount: (value: number) => void;
};

// Ꝏ
