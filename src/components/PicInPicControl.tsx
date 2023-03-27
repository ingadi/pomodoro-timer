import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  RiPictureInPictureExitFill,
  RiPictureInPicture2Line,
} from "react-icons/ri";
import styles from "./PicInPicControl.module.css";

export function PicInPicControl({ lines }: Props) {
  const [isActive, setIsActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (document.pictureInPictureEnabled) {
      isActive && videoRef.current!.requestPictureInPicture();
    }
    return () => {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      }
    };
  }, [isActive]);

  useEffect(() => {
    const stream = canvas.captureStream(25);

    lines.forEach((line, idx) => {
      ctx.fillText(line, canvas.width / 2, canvas.height / 2 + idx * 20);
    });

    videoRef.current!.srcObject = stream;
    videoRef.current!.addEventListener("leavepictureinpicture", () => {
      setIsActive(false);
    });

    return () => clearCanvas();
  }, [lines]);

  return (
    <>
      {createPortal(
        <video
          className={styles.video}
          ref={videoRef}
          autoPlay={true}
          hidden={!isActive}
          playsInline
          muted={true}
        ></video>,
        document.body
      )}
      <button
        title="Toggle always on top"
        className={`${styles.button} ${isActive ? styles.active : ""}`}
        onClick={() => setIsActive(!isActive)}
      >
        {isActive ? (
          <RiPictureInPictureExitFill />
        ) : (
          <RiPictureInPicture2Line />
        )}
      </button>
    </>
  );
}

const canvas = document.createElement("canvas");
canvas.width = 200;
canvas.height = 100;
const ctx = canvas.getContext("2d")!;
ctx.font = "bold 20px sans-serif ";
ctx.textAlign = "center";
ctx.textBaseline = "bottom";

function clearCanvas() {
  ctx.fillStyle = "#2d2578";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "whitesmoke";
}

type Props = {
  lines: string[];
};
