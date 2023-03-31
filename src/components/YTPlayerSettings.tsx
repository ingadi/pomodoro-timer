import { z } from "zod";
import Form from "@components/Form";
import { defaultPlayListId } from "@constants";
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
        onUpdate(data["playlist id"]);
        onDone();
      }}
      renderAfter={() => formControls}
    />
  );
}

const FormSchema = z.object({
  "playlist id": z
    .string()
    .describe(`Playlist ID // ${defaultPlayListId}`)
    .regex(/^PL.{32}$/),
});

type Props = {
  onUpdate: (playListId: string) => void;
  onDone: () => void;
};
