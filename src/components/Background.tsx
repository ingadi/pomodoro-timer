import styles from "./Background.module.css";

export default function Background({ name }: Props) {
  return Backgrounds[name];
}

function Squares() {
  return (
    //TODO: Transorm to divs
    <ul className={styles["squares"]}>
      {Array.from({ length: 10 }, (_, i) => (
        <li className={styles.square} key={i}></li>
      ))}
    </ul>
  );
}

function FireWorks() {
  return (
    <div className={styles.background}>
      {Array.from({ length: 20 }, (_, i) => (
        <div
          className={`${styles[`pattern${i}`]} ${styles.fireworks} ${
            styles[`fire${i}`]
          }`}
        >
          <div className={styles["ring_1"]}></div>
          <div className={styles["ring_2"]}></div>
        </div>
      ))}
    </div>
  );
}

const Backgrounds = {
  squares: <Squares />,
  fireworks: <FireWorks />,
} as const;

type Props = {
  name: keyof typeof Backgrounds;
};
