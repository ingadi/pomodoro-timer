import styles from "./Session.module.css";

export default function Session({ duration, type, isActive }: Props) {
  return (
    <article className={`${styles.session} ${isActive ? styles.active : ""}`}>
      {/* <span>{duration}</span> */}
      <input className={styles.input} value={duration} type="text" />
    </article>
  );
}

type Props = {
  duration: string;
  type: string;
  isActive: boolean;
};
