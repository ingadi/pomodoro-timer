import styles from "./Header.module.css";
import { GrAchievement } from "react-icons/gr";
import { useState } from "react";

export function Header({ cycleCount, cycleCountGoal, type }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  function handleUpdateCycleGoal() {
    console.log("hi");
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{type}</h1>
      <label className={styles.cycles}>
        {cycleCount >= cycleCountGoal && <GrAchievement />} {cycleCount} /{" "}
        {!isEditing && (
          <span onClick={() => setIsEditing(true)}>
            <b className={styles["cycle-goal"]}>
              {cycleCountGoal === Infinity ? "Ꝏ" : cycleCountGoal}
            </b>{" "}
            cycles
          </span>
        )}
        {isEditing && (
          <span>
            <input type="text" />
            {/* extract as controls */}
            <button onClick={() => handleUpdateCycleGoal()}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </span>
        )}
      </label>
    </header>
  );
}

type Props = {
  cycleCount: number;
  cycleCountGoal: number;
  type: string;
};
