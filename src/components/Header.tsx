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
          title="Today's completed work intervals"
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
    </header>
  );
}

type Props = {
  workIntervalCount: number;
  workIntervalCountGoal: number;
  currentIntervalName: string;
};
