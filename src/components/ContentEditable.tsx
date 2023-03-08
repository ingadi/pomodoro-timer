import { useState } from "react";
import { MdCheckCircleOutline, MdCancel } from "react-icons/md";
import styles from "./ContentEditable.module.css";

export function ContentEditable({
  children,
  value,
  label,
  onUpdateValue,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  return (
    <>
      {!isEditing && <span onClick={() => setIsEditing(true)}>{children}</span>}
      {isEditing && (
        <span>
          <input
            className={styles.input}
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.valueAsNumber)}
            autoFocus={true}
            min={1}
          />
          {label && <span className={styles.label}>{label}</span>}
          <div className="buttons">
            <button
              className={styles.button}
              onClick={(e) => {
                onUpdateValue(inputValue);
                setIsEditing(false);
              }}
            >
              <MdCheckCircleOutline />
            </button>
            <button
              className={styles.button}
              onClick={() => {
                setInputValue(value);
                setIsEditing(false);
              }}
            >
              <MdCancel />
            </button>
          </div>
        </span>
      )}
    </>
  );
}

type Props = {
  label?: string;
  children: JSX.Element;
  value: number;
  onUpdateValue: (value: number) => void;
};
