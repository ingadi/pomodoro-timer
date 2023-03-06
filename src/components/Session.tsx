import { useState } from "react";
import styles from "./Session.module.css";
import { MdCheckCircleOutline, MdCancel } from "react-icons/md";

export default function Session({
  duration,
  type,
  isActive,
}: // isEditing,
// onEdit,
Props) {
  const [timerValue, setTimerValue] = useState(Math.floor(duration / 60));
  const [isEditing, setIsEditing] = useState(false);

  return (
    <article className={`${styles.session} ${isActive ? styles.active : ""}`}>
      {!isEditing && (
        <span onClick={() => setIsEditing(true)}>
          {toformattedMinsSecs(duration)}
        </span>
      )}
      {isEditing && (
        <>
          <input
            name="timer"
            className={styles.input}
            value={timerValue}
            min={1}
            type="number"
            onChange={(e) => setTimerValue(e.target.valueAsNumber)}
            autoFocus={true}
          />
          <div className={styles.controls}>
            <button className={styles.button}>
              <MdCheckCircleOutline />
            </button>
            <button
              className={styles.button}
              onClick={() => {
                setIsEditing(false);
                setTimerValue(timerValue);
              }}
            >
              <MdCancel />
            </button>
          </div>
        </>
      )}
    </article>
  );
}

function toformattedMinsSecs(totalSeconds: number) {
  const minutes = `${Math.floor(totalSeconds / 60)}`;
  const seconds = `${totalSeconds % 60}`;
  return `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
}

type Props = {
  duration: number;
  type: string;
  isActive: boolean;
  // isEditing: boolean;
  // onEdit: (isEditing: boolean) => void;
};
