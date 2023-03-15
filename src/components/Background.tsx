import styles from "./Background.module.css";

export default function Background({ name }: Props) {
  return Backgrounds[name];
}

function Squares() {
  return (
    <ul className={styles["squares"]}>
      {Array.from({ length: 10 }, (_, i) => (
        <li className={styles.square} key={i}></li>
      ))}
    </ul>
  );
}

const Backgrounds = {
  squares: <Squares />,
} as const;

type Props = {
  name: keyof typeof Backgrounds;
};
