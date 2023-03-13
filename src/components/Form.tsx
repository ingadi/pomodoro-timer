import { z } from "zod";
import { createTsForm, useDescription, useTsController } from "@ts-react/form";
import styles from "./Form.module.css";

// TODO: Style input forms

function NumberField() {
  const {
    field: { value, onChange },
    error,
  } = useTsController<number>();
  const { label, placeholder } = useDescription();

  return (
    <>
      <label>{label}</label>
      <input
        placeholder={placeholder}
        className={styles.input}
        type="number"
        value={value ?? ""}
        onChange={(e) => {
          const value = e.target.valueAsNumber;
          onChange(isNaN(value) ? undefined : value);
        }}
      />
      {error?.errorMessage && <p>{error?.errorMessage}</p>}
    </>
  );
}

function CheckBoxField() {
  const {
    field: { value, onChange },
  } = useTsController<boolean>();
  const { label } = useDescription();

  return (
    <>
      <label>{label}</label>
      <input
        type="checkbox"
        checked={value ?? false}
        onChange={(e) => onChange(e.target.checked)}
      />
    </>
  );
}

const mapping = [
  [z.number(), NumberField],
  [z.boolean(), CheckBoxField],
] as const;

export default createTsForm(mapping);
