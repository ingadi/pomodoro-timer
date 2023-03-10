import { useEffect, useRef } from "react";
import styles from "./Settings.module.css";

export default function Settings({ children, isOpen, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function handleClose() {
    dialogRef.current!.close();
    onClose();
  }

  useEffect(() => {
    const dialog = dialogRef.current!;
    isOpen && dialog.showModal();
    return () => dialog.close();
  }, [isOpen]);

  return (
    <dialog className={styles.settings} ref={dialogRef}>
      {children}
      <button onClick={handleClose}>OK</button>
    </dialog>
  );
}

type Props = {
  children: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
};
