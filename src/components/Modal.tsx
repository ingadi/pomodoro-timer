import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

export default function Modal({ children, isOpen }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current!;
    isOpen && dialog.showModal();
    return () => dialog.close();
  }, [isOpen]);

  return (
    <dialog className={styles.modal} ref={dialogRef}>
      {children}
    </dialog>
  );
}

type Props = {
  children: JSX.Element;
  isOpen: boolean;
};
