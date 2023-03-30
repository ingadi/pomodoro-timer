import { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { BiFullscreen, BiExitFullscreen } from "react-icons/bi";
import { GiThreeFriends } from "react-icons/gi";
// import Modal from "@components/Modal";
import styles from "./AppControls.module.css";

export default function AppControls({ children }: { children: JSX.Element }) {
  return <section className={styles.controls}>{children}</section>;
}

export function StudyGroupBg() {
  return (
    <button className={styles.button}>
      <GiThreeFriends />
    </button>
  );
}

export function FullSreenControl() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  }

  return (
    <button
      title="Toggle fullscreen"
      className={`${styles.button} ${isFullScreen ? styles.active : ""}`}
      onClick={toggleFullScreen}
    >
      {isFullScreen ? <BiExitFullscreen /> : <BiFullscreen />}
    </button>
  );
}

export function SettingsControl({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      title="Open settings"
      className={`${styles.button} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      <IoMdSettings />
    </button>
  );
}

// export function SettingsControl() {
//   return (
//     <Modal>
//       <>
//         <nav>
//           <ul className={styles["tab-links"]}>
//             <li className={`${styles.link} ${styles.active}`}>First Tab</li>
//             <li className={styles.link}>Second Tab</li>
//             <li className={styles.link}>Third Tab</li>
//           </ul>
//         </nav>
//         <section className={styles["tab-content"]}>
//           <h2>First</h2>
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//             Repellendus itaque quidem minus nostrum, voluptatem accusamus
//             aspernatur quia harum ratione, officia laudantium inventore autem
//             doloribus atque labore numquam non. Hic, animi.
//           </p>
//         </section>
//       </>
//     </Modal>
//   );
// }

// function Tabs(){
//   return (
//     <>
//       <nav>
//         <ul>

//         </ul>
//       </nav>
//       <section>

//       </section>
//     </>
//   );
// }
