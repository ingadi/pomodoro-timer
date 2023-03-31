import { useEffect, useRef, useState } from "react";
import YouTubePlayer from "youtube-player";
import { useLocalStorage } from "usehooks-ts";
import { TfiYoutube } from "react-icons/tfi";
import { SiYoutubestudio } from "react-icons/si";
import Modal from "@components/Modal";
import YTPlayerSettings from "@components/YTPlayerSettings";
import { IntervalName } from "@types";
import { defaultPlayListId } from "@constants";
import styles from "./YouTubeControl.module.css";

export default function YouTubeControl({
  isActive,
  intervalName,
  isTimerActive,
  onActive,
}: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  const isPlayerReady = useRef(false);
  const [playListId, setPlayListIds] = useLocalStorage<string>(
    "playlist-id",
    defaultPlayListId
  );

  const [showSettings, setShowSettings] = useState(false);

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

  function handleAddPlaylistId(playListId: string) {
    setPlayListIds(playListId);
  }

  return (
    <>
      <div ref={parentRef} className={styles.iframe}></div>
      <button
        title="Toggle YouTube player"
        className={`${styles.button} ${isActive ? styles.active : ""}`}
        onClick={onActive}
      >
        <TfiYoutube />
      </button>

      {isActive && (
        <>
          <button
            className={`${styles.button} ${showSettings ? styles.active : ""}`}
            onClick={() => setShowSettings(!showSettings)}
          >
            <SiYoutubestudio title="Toggle YouTube player settings" />
          </button>
          {showSettings && (
            <Modal
              title={
                <>
                  <SiYoutubestudio />
                  Player settings
                </>
              }
              onCancel={() => setShowSettings(false)}
            >
              <YTPlayerSettings
                onDone={() => setShowSettings(false)}
                onUpdate={handleAddPlaylistId}
              />
            </Modal>
          )}
        </>
      )}
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
  onActive: () => void;
};
