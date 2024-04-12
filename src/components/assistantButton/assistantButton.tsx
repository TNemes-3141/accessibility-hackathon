import { FunctionComponent, RefObject } from "react";

export const AssistantButton: FunctionComponent<{
  dialogRef: RefObject<HTMLDialogElement>;
}> = ({ dialogRef }) => {
  return (
    <button
      type="button"
      className="absolute -bottom-4 -right-4 rounded-full focus-visible:outline-offset-4 focus-visible:outline-blue-500 focus-visible:outline-2"
      onClick={() => {
        dialogRef.current?.showModal();
      }}
    >
      <span className="sr-only">Fragen zum Bild stellen</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
      >
        <circle cx="24" cy="24" r="24" fill="#2563eb" />
        <path
          d="M14 17.4286L23.5 19.5397M23.5 19.5397L33 17.4286M23.5 19.5397V25.873M23.5 25.873L19.7 36.4286M23.5 25.873L27.3 36.4286"
          stroke="#F2F8FF"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M23.5 14.7143C22.7506 14.7143 22.1428 14.1067 22.1428 13.3571C22.1428 12.6076 22.7506 12 23.5 12C24.2494 12 24.8571 12.6076 24.8571 13.3571C24.8571 14.1067 24.2494 14.7143 23.5 14.7143Z"
          fill="#F2F8FF"
          stroke="#F2F8FF"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
};
