import Session from "@components/Session";
import styles from "./App.module.css";

const upcomingSessions = [
  { duration: "15:00", type: "short-break" },
  { duration: "30:00", type: "long-break" },
];

export default function App() {
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>
        <span
          className={`${styles.type} ${styles["super-icon"]} ${styles["work"]} `}
        >
          Work
        </span>
        <span className={styles.cycles}>4 cycles</span>
      </h1>
      <section className={styles.sessions}>
        <Session duration="45:00" type="work" isActive={true} />
        <div>
          {upcomingSessions.map(({ duration, type }, idx) => (
            <Session
              key={idx}
              duration={duration}
              type={type}
              isActive={false}
            />
          ))}
        </div>
      </section>
      <div className={styles.controls}>
        <button className={styles.button}>Start</button>
        <button className={styles.button}>Stop</button>
      </div>
    </section>
  );
}
