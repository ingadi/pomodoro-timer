import { useState } from "react";
import styles from "./Session.module.css";
import { ContentEditable } from "@components/ContentEditable";

export default function Session({ duration, type, isActive }: Props) {
  return (
    <article className={`${styles.session} ${isActive ? styles.active : ""}`}>
      <ContentEditable
        label="mins"
        value={Math.floor(duration / 60)}
        onUpdateValue={() => {}}
      >
        <>{toformattedMinsSecs(duration)}</>
      </ContentEditable>
    </article>
  );
}

function toformattedMinsSecs(totalSeconds: number) {
  const minutes = `${Math.floor(totalSeconds / 60)}`;
  const seconds = `${totalSeconds % 60}`;
  return `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
}

type Props = {
  duration: number;
  type: string;
  isActive: boolean;
  // isEditing: boolean;
  // onEdit: (isEditing: boolean) => void;
};
