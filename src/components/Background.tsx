import styles from "./Background.module.css";

export default function Background({ name }: Props) {
  return <>{Backgrounds[name]}</>;
}

function FriendStream() {
  return <></>;
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

function ColorBackground({ children }: { children: JSX.Element }) {
  return <div className={styles["color-background"]}>{children}</div>;
}

const Backgrounds = {
  squares: (
    <ColorBackground>
      <Squares />
    </ColorBackground>
  ),
  fireworks: (
    <ColorBackground>
      <FireWorks />
    </ColorBackground>
  ),
  friendstream: <FriendStream />,
} as const;

type Props = {
  name: keyof typeof Backgrounds;
};
