import { z } from "zod";
import { createTsForm, useDescription, useTsController } from "@ts-react/form";
import styles from "./Form.module.css";

function NumberField({ subLabel }: { subLabel?: string }) {
  const {
    field: { value, onChange },
    error,
  } = useTsController<number>();
  const { label, placeholder } = useDescription();

  return (
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
      {error?.errorMessage && <p>{error?.errorMessage}</p>}
    </div>
  );
}

function CheckBoxField() {
  const {
    field: { value, onChange },
  } = useTsController<boolean>();
  const { label } = useDescription();

  return (
    <div className={styles.checkbox}>
      <label className={styles.label}>{label}</label>
      <input
        type="checkbox"
        checked={value ?? false}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
}

const mapping = [
  [z.number(), NumberField],
  [z.boolean(), CheckBoxField],
] as const;

export default createTsForm(mapping);
