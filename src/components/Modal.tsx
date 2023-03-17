import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

export default function Modal({ children }: Props) {
  return createPortal(
    <dialog className={styles.modal} open>
      {children}
    </dialog>,
    document.body
  );
}

type Props = {
  children: JSX.Element;
};
