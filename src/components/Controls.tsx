import styles from "./Controls.module.css";

export default function Controls({ children }: Props) {
  return <section className={styles.controls}>{children}</section>;
}

type Props = {
  children: JSX.Element;
};
