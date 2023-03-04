import { useState } from "react";
import styles from "./Session.module.css";
import { MdCheckCircleOutline, MdCancel } from "react-icons/md";

export default function Session({ duration, type, isActive }: Props) {
  const [timerValue, setTimerValue] = useState(duration);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <article className={`${styles.session} ${isActive ? styles.active : ""}`}>
      {!isEditing && <span onClick={() => setIsEditing(true)}>{duration}</span>}
      {isEditing && (
        <>
          <input
            name="timer"
            className={styles.input}
            value={timerValue}
            type="text"
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
                setTimerValue(duration);
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

type Props = {
  duration: number;
  type: string;
  isActive: boolean;
};
