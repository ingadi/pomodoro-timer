import styles from "./Header.module.css";
import { GrAchievement } from "react-icons/gr";
import { ContentEditable } from "@components/ContentEditable";

export function Header({
  cycleCount,
  cycleCountGoal,
  type,
  onUpdateCycleGoal,
}: Props) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{type}</h1>
      <label className={styles.cycles}>
        {cycleCount >= cycleCountGoal && <GrAchievement />} {cycleCount} /{" "}
        <ContentEditable
          label="cycles"
          value={cycleCountGoal}
          onUpdateValue={(cycleCountGoal) => onUpdateCycleGoal(cycleCountGoal)}
        >
          <>
            <b className={styles["cycle-goal"]}>
              {cycleCountGoal === Infinity ? "Ꝏ" : cycleCountGoal}
            </b>{" "}
            cycles
          </>
        </ContentEditable>
      </label>
    </header>
  );
}

type Props = {
  cycleCount: number;
  cycleCountGoal: number;
  type: string;
  onUpdateCycleGoal: (value: number) => void;
};
