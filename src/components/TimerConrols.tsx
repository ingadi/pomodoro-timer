import styles from "./TimerControls.module.css";

export default function TimerControls({
  isActive,
  onStart,
  onPause,
  onEnd,
}: Props) {
  return (
    <div className={styles.wrapper}>
      {isActive ? (
        <button className={styles.button} onClick={onPause}>
          Pause
        </button>
      ) : (
        <button
          className={`${styles.button} ${!isActive ? styles.long : ""}`}
          onClick={onStart}
        >
          Start
        </button>
      )}

      {isActive && (
        <button className={styles.button} onClick={onEnd}>
          End
        </button>
      )}
    </div>
  );
}

type Props = {
  isActive: boolean;
  onStart: () => void;
  onPause: () => void;
  onEnd: () => void;
};
