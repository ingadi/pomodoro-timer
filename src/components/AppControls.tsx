import { IoMdSettings } from "react-icons/io";
import { BiFullscreen, BiExitFullscreen } from "react-icons/bi";
import { TfiYoutube } from "react-icons/tfi";
import { GiThreeFriends } from "react-icons/gi";
import { SlPicture } from "react-icons/sl";
// import {
//   RiPictureInPictureExitFill,
//   RiPictureInPicture2Line,
// } from "react-icons/ri";
import styles from "./AppControls.module.css";
import { useState } from "react";

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

export function PictureBg() {
  return (
    <button className={styles.button}>
      <SlPicture />
    </button>
  );
}
export function YouTubeBG() {
  return (
    <button className={styles.button}>
      <TfiYoutube />
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

// export function PicInPicControl({ element }: { element: HTMLDivElement }) {
//   return (
//     <button className={styles.button}>
//       <RiPictureInPicture2Line />
//     </button>
//   );
// }

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
