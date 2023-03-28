import styles from "./Background.module.css";

export default function Background({ name }: Props) {
  return <>{Backgrounds[name]}</>;

  // return (
  //   <iframe
  //     className={styles.iframe}
  //     src="https://www.youtube.com/embed/yUpl_HQrBnM"
  //     title="YouTube video player"
  //   ></iframe>
  // );
}

function ColorBackground({ children }: { children: JSX.Element }) {
  return <div className={styles["color-background"]}>{children}</div>;
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
} as const;

type Props = {
  name: keyof typeof Backgrounds;
};
