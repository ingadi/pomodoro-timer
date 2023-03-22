import { IntervalName } from "@types";
import styles from "./Intervals.module.css";

export default function Intervals({ currentIntervalName }: Props) {
  return (
    <nav>
      <ol className={styles.intervals}>
        {IntervalNames.map((name, idx) => (
          <li
            key={idx}
            className={`${name === currentIntervalName ? styles.active : ""} ${
              styles.interval
            }`}
          >
            {name}
          </li>
        ))}
      </ol>
    </nav>
  );
}

const IntervalNames = ["short break", "work", "long break"] as const;

type Props = {
  currentIntervalName: IntervalName;
};
