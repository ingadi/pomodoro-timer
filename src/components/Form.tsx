import { z } from "zod";
import { createTsForm, useTsController } from "@ts-react/form";
import styles from "./Form.module.css";

export default function Form({ onSubmit, schema, props, controls }: FormProps) {
  return (
    <MyForm
      onSubmit={(data) => onSubmit(data)}
      renderAfter={() => controls}
      schema={schema}
      props={props}
    ></MyForm>
  );
}

function TextField({ label }: { label: string }) {
  const { field, error } = useTsController<string>();

  return (
    <>
      <label>{label}</label>
      <input
        className={styles.input}
        type="text"
        value={field.value ?? ""}
        onChange={(e) => field.onChange(e.target.value)}
      />
      {error?.errorMessage && <p>{error?.errorMessage}</p>}
    </>
  );
}

function CheckBoxField({ label }: { label: string }) {
  const { field } = useTsController<boolean>();

  return (
    <>
      <label>{label}</label>
      <input
        type="checkbox"
        checked={field.value ?? false}
        onChange={(e) => field.onChange(e.target.checked)}
      />
    </>
  );
}

const mapping = [
  [z.string(), TextField],
  [z.boolean(), CheckBoxField],
] as const;

const MyForm = createTsForm(mapping);

type FormProps = {
  onSubmit: (data: any) => void;
  schema: any;
  props: any;
  controls: JSX.Element;
};

// const SignUpSchema = z.object({
//   email: z.string().email("Enter a real email please."),
//   password: z.string(),
//   notificationsOn: z.boolean(),
// });
