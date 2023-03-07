import styles from "./Header.module.css";
import { GrAchievement } from "react-icons/gr";

export function Header({ cycleCount, cycleCountGoal, type }: Props) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{type}</h1>
      <label className={styles.cycles}>
        {cycleCount >= cycleCountGoal && <GrAchievement />} {cycleCount} /{" "}
        <span>
          <b className={styles["cycle-goal"]}>
            {cycleCountGoal === Infinity ? "Ꝏ" : cycleCountGoal}
          </b>{" "}
          cycles
        </span>
        {/* <span>
        <input type="text" />
        <button></button>
        <button></button>
      </span> */}
      </label>
    </header>
  );
}

type Props = {
  cycleCount: number;
  cycleCountGoal: number;
  type: string;
};
