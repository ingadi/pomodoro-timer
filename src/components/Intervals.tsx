import styles from "./Intervals.module.css";

export default function Intervals({ currentIntervalName }: Props) {
  return (
    <header>
      <h1 title="Current interval" className={styles.title}>
        {currentIntervalName}
      </h1>
    </header>
  );
}

type Props = {
  currentIntervalName: string;
};
