import { FunctionComponent, RefObject } from "react";
import { Help } from "../icon/icon";

export const AssistantButton: FunctionComponent<{
  dialogRef: RefObject<HTMLDialogElement>;
}> = ({ dialogRef }) => {
  return (
    <button
      type="button"
      className="absolute -bottom-4 -right-4 rounded-full focus-visible:outline-offset-4 focus-visible:outline-blue-500 focus-visible:outline-2"
      onClick={() => {
        if (dialogRef.current) {
          dialogRef.current.showModal();

          // Scroll to bottom of dialog
          dialogRef.current.scrollTop = dialogRef.current.scrollHeight;
        }
      }}
    >
      <span className="sr-only">Fragen zum Bild stellen</span>
      <Help />
    </button>
  );
};
