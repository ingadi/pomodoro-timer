import styles from "./TimerControls.module.css";

export default function TimerControls({
  isActive,
  onStart,
  onPause,
  onEnd,
}: Props) {
  return (
    <>
      <div>
        {isActive ? (
          <button className={styles.button} onClick={onPause}>
            Pause
          </button>
        ) : (
          <button className={styles.button} onClick={onStart}>
            Start
          </button>
        )}
      </div>
      <button className={styles.button} onClick={onEnd}>
        End
      </button>
    </>
  );
}

type Props = {
  isActive: boolean;
  onStart: () => void;
  onPause: () => void;
  onEnd: () => void;
};
