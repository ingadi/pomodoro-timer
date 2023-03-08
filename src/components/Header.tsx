import styles from "./Header.module.css";
import { GrAchievement } from "react-icons/gr";
import { useState } from "react";

export function Header({
  cycleCount,
  cycleCountGoal,
  type,
  onUpdateCycleGoal,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(cycleCount);

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
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.valueAsNumber)}
              autoFocus={true}
            />
            {/* extract as controls */}
            <button
              onClick={(e) => {
                onUpdateCycleGoal(inputValue);
                setIsEditing(false);
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setInputValue(cycleCountGoal);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
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
  onUpdateCycleGoal: (value: number) => void;
};
