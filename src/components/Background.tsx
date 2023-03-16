import styles from "./Background.module.css";

export default function Background({ name }: Props) {
  return <div className={styles.background}>{Particles[name]}</div>;
}

function Squares() {
  return (
    <>
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className={styles.square}></div>
      ))}
    </>
  );
}

function FireWorks() {
  return (
    <>
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className={`${styles[`pattern${i}`]} ${styles.fireworks} ${
            styles[`fire${i}`]
          }`}
        >
          <div className={styles["ring_1"]}></div>
          <div className={styles["ring_2"]}></div>
        </div>
      ))}
    </>
  );
}

const Particles = {
  squares: <Squares />,
  fireworks: <FireWorks />,
} as const;

type Props = {
  name: keyof typeof Particles;
};
