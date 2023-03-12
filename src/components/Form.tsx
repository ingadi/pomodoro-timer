import { z } from "zod";
import { createTsForm, useTsController } from "@ts-react/form";
import styles from "./Form.module.css";

function TextField({
  label,
  defaultValue = "",
}: {
  label: string;
  defaultValue: string;
}) {
  const { field, error } = useTsController<string>();

  return (
    <>
      <label>{label}</label>
      <input
        className={styles.input}
        type="text"
        value={field.value ?? defaultValue}
        onChange={(e) => field.onChange(e.target.value)}
      />
      {error?.errorMessage && <p>{error?.errorMessage}</p>}
    </>
  );
}

function CheckBoxField({
  label,
  defaultValue = false,
}: {
  label: string;
  defaultValue: boolean;
}) {
  const { field } = useTsController<boolean>();

  return (
    <>
      <label>{label}</label>
      <input
        type="checkbox"
        checked={field.value ?? defaultValue}
        onChange={(e) => field.onChange(e.target.checked)}
      />
    </>
  );
}

const mapping = [
  [z.string(), TextField],
  [z.boolean(), CheckBoxField],
] as const;

export default createTsForm(mapping);
