import { z } from "zod";
import { BiErrorCircle } from "react-icons/bi";
import { FiSkipForward, FiFastForward } from "react-icons/fi";
import { createTsForm, useDescription, useTsController } from "@ts-react/form";
import styles from "./Form.module.css";

function NumberField({ subLabel }: { subLabel?: string }) {
  const {
    field: { value, onChange },
    error,
  } = useTsController<number | string>();
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
            min="0"
            value={value ?? ""}
            onChange={(e) => {
              const val = e.target.valueAsNumber;
              onChange(isNaN(val) ? "" : val);
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
    <label htmlFor="toggle">
      <span className={styles["toggle-label"]}>{label}</span>
      <input
        className={styles["toggle-checkbox"]}
        id="toggle"
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
        checked={value ?? false}
      />
      <div className={styles["toggle-options"]}>
        <span className={styles["toggle-option"]}>
          No <FiSkipForward />
        </span>
        <span className={styles["toggle-option"]}>
          Yes <FiFastForward />
        </span>
      </div>
    </label>
  );
}

const mapping = [
  [z.number(), NumberField],
  [z.boolean(), ToggleSwitchField],
] as const;

export default createTsForm(mapping);
