import { z } from "zod";
import Form from "@components/Form";
import styles from "./Settings.module.css";

export default function Settings({ onUpdate, onDone }: Props) {
  return (
    <Form
      onSubmit={(data) => {
        console.info(JSON.stringify(data));
        onDone();
      }}
      renderAfter={() => <button type="submit">Submit</button>}
      schema={SettingsSchema}
      props={{
        email: {
          label: "Enter an email",
          defaultValue: "beans@beans.com",
        },
        password: {
          label: "Enter a password",
          defaultValue: "beans",
        },
        notificationsOn: {
          label: "Enter a password",
          defaultValue: true,
        },
      }}
    />
  );

  // return (
  //   <>
  //     <p>Pomo goals</p>
  //     <p>Work duration</p>
  //     <p>Short break duration</p>
  //     <p>Long break duration</p>
  //     <p>Auto next</p>
  //   </>
  // );
}

const SettingsSchema = z.object({
  email: z.string().email("Enter a real email please."),
  password: z.string(),
  notificationsOn: z.boolean(),
});

type Props = {
  onUpdate: (s: Config) => void;
  onDone: () => void;
};

type Config = {
  intervals: { [key: string]: number };
  workIntervalCountGoal: number;
  isAutoNextEnabled: boolean;
  workIntervalsToLongBreak: number;
};
