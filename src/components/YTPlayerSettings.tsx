import { z } from "zod";
import Form from "@components/Form";
import styles from "./Settings.module.css";

export default function YTPlayerSettings({ onDone, onUpdate }: Props) {
  const formControls = (
    <div className={styles.controls}>
      <div className={styles.primary}>
        <button className={styles.button} onClick={onDone} type="button">
          Cancel
        </button>
        <button
          className={`${styles.button} ${styles["button-primary"]}`}
          type="submit"
        >
          Save changes
        </button>
      </div>
    </div>
  );

  return (
    <Form
      schema={FormSchema}
      onSubmit={(data: z.infer<typeof FormSchema>) => {
        onUpdate();
        onDone();
      }}
      renderAfter={() => formControls}
    />
  );
}

const FormSchema = z.object({
  "playlist id": z
    .string()
    .describe(`Playlist ID // ${"PLt7bG0K25iXjy1L7Wpf6jgeEvMlwpNpqF"}`)
    .regex(/^PL.{32}$/),
});

type Props = {
  // config: Config;
  onUpdate: () => void;
  onDone: () => void;
};

// const regexPattern = /^PL.{32}$/;
