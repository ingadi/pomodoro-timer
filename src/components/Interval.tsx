import { ContentEditable } from "@components/ContentEditable";

export default function Interval({ duration, name }: Props) {
  return (
    <article>
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
  name: intervalName;
};

type intervalName = "work" | "short break" | "long break";
