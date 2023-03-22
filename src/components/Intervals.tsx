import { IntervalName } from "@types";
import styles from "./Intervals.module.css";

export default function Intervals({
  currentIntervalName,
  onSelecteInterval,
}: Props) {
  function handleClick(name: IntervalName) {
    if (name === currentIntervalName) return;
    onSelecteInterval(name);
  }

  return (
    <nav>
      <ol className={styles.intervals}>
        {IntervalNames.map((name, idx) => (
          <li
            key={idx}
            className={`${name === currentIntervalName ? styles.active : ""} ${
              styles.interval
            }`}
            onClick={() => handleClick(name)}
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
  onSelecteInterval: (name: IntervalName) => void;
};
