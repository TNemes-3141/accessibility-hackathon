import { Submit } from "../icon/icon";

export const SubmitButton = () => (
  <button className="bg-primary p-3 rounded-full focus-visible:outline-offset-4">
    <span className="sr-only">Frage abschicken</span>
    <Submit />
  </button>
);
