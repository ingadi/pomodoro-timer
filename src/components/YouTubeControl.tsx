import { useEffect, useRef } from "react";
import YouTubePlayer from "youtube-player";
import { TfiYoutube } from "react-icons/tfi";
import styles from "./YouTubeControl.module.css";
import { IntervalName } from "@types";

export default function YouTubeControl({
  isActive,
  intervalName,
  isTimerActive,
  playListId,
  onClick,
}: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  const isPlayerReady = useRef(false);
  let state: keyof typeof actions = "paused";

  if (intervalName === "work" && isTimerActive) {
    state = "playing";
  }

  useEffect(() => {
    if (isActive) {
      const player = YouTubePlayer(parentRef.current!, {
        playerVars: {
          listType: "playlist",
          list: playListId,
        },
      });

      actions["playing"] = player.playVideo;
      actions["paused"] = player.pauseVideo;

      player.cuePlaylist(["yUpl_HQrBnM", "n5uz7egB9tA"]);

      isPlayerReady.current = true;

      return () => {
        isActive && player.destroy();
      };
    }
  }, [isActive, playListId]);

  useEffect(() => {
    if (isPlayerReady.current) {
      actions[state]();
    }
  }, [state]);

  return (
    <>
      <div ref={parentRef} className={styles.iframe}></div>
      <button
        title="Toggle YouTube player"
        className={`${styles.button} ${isActive ? styles.active : ""}`}
        onClick={onClick}
      >
        <TfiYoutube />
      </button>
    </>
  );
}

const actions = {
  playing: () => new Promise<void>(() => {}),
  paused: () => new Promise<void>(() => {}),
};

type Props = {
  isActive: boolean;
  intervalName: IntervalName;
  isTimerActive: boolean;
  playListId: string;
  onClick: () => void;
};
