import { createPortal } from "react-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import styles from "./Modal.module.css";

export default function Modal({ title, onCancel, children }: Props) {
  return createPortal(
    <dialog className={styles.modal} open>
      <header className={styles.header}>
        <h2>{title}</h2>
        <button className={styles.close} type="button" onClick={onCancel}>
          <AiFillCloseCircle />
        </button>
      </header>
      <section>{children}</section>
    </dialog>,
    document.body
  );
}

type Props = {
  title: string;
  children: JSX.Element;
  onCancel: () => void;
};
