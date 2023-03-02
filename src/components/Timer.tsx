export default function Timer({ time }: Props) {
  return <li>{time}</li>;
}

type Props = {
  time: string;
};
