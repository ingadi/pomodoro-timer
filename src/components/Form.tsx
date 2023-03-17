import { z } from "zod";
import { BiErrorCircle } from "react-icons/bi";
import { FiSkipForward, FiFastForward } from "react-icons/fi";
import { createTsForm, useDescription, useTsController } from "@ts-react/form";
import styles from "./Form.module.css";

function NumberField({ subLabel }: { subLabel?: string }) {
  const {
    field: { value, onChange },
    error,
  } = useTsController<number>();
  const { label, placeholder } = useDescription();

  return (
    <div className={styles["input-group"]}>
      <div className={styles.input}>
        <label className={styles.label}>{label}</label>
        <span className={styles["field-group"]}>
          <input
            placeholder={placeholder}
            className={styles.field}
            type="number"
            value={value ?? ""}
            onChange={(e) => {
              const value = e.target.valueAsNumber;
              onChange(isNaN(value) ? undefined : value);
            }}
          />
          <span>{subLabel}</span>
        </span>
      </div>
      {error?.errorMessage && (
        <p className={styles.error}>
          <BiErrorCircle />
          {error?.errorMessage}
        </p>
      )}
    </div>
  );
}

function ToggleSwitchField() {
  const {
    field: { value, onChange },
  } = useTsController<boolean>();

  const { label } = useDescription();

  return (
    <>
      <label htmlFor="toggle" className={styles["toggle-field-label"]}>
        {label}
      </label>

      <div className={styles["toggle-group"]}>
        <label htmlFor="no" className={styles["toggle-label"]}>
          No
          <FiSkipForward />
          <input
            className={styles["toggle-input"]}
            type="radio"
            name="toggle"
            value="no"
            id="no"
            checked={!value}
            onChange={() => onChange(false)}
          />
        </label>

        <label htmlFor="yes" className={styles["toggle-label"]}>
          Yes
          <FiFastForward />
          <input
            className={styles["toggle-input"]}
            type="radio"
            name="toggle"
            value="yes"
            id="yes"
            checked={value}
            onChange={() => onChange(true)}
          />
        </label>
      </div>
    </>
  );
}

const mapping = [
  [z.number(), NumberField],
  [z.boolean(), ToggleSwitchField],
] as const;

export default createTsForm(mapping);
