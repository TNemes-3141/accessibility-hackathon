"use client";
import { useEffect, useState } from "react";
import { SubmitButton } from "./submitButton";
import type { ChatMessage, ChatOutput } from "../../app/api/chat/route";

export function Chat({
  productImage,
  productDescription,
  productImageAlt,
}: {
  productImage: string;
  productDescription: string;
  productImageAlt: string;
}) {
  const [messages, setMessages] = useState<Array<ChatMessage>>([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!productImage) return;

    fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        init: {
          productImage,
          productDescription,
          productImageAlt,
        },
      }),
    })
      .then((response) => response.json())
      .then(({ message }) => {
        setMessages([{ role: "system", message }]);
      });
  }, [productImage, productDescription, productImageAlt]);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const form = event.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        
        setIsLoading(true);

        const response = (await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: data.get("message"),
            history: messages,
          }),
        }).then((response) => response.json())) as ChatOutput;
        
        setIsLoading(false);

        const newMessages = [
          ...messages,
          {
            role: "user" as ChatMessage["role"],
            message: String(data.get("message")),
          },
        ];

        if (response.message) {
          newMessages.push({
            role: "system" as ChatMessage["role"],
            message: response.message,
          });
        }

        setMessages(newMessages);
        form.reset();
      }}
    >
      <ol className="flex flex-col">
        {messages.map((message, index) => (
          <li
            key={index}
            className={`${
              message.role === "system"
                ? `bg-message p-3 rounded-lg inline-block justify-self-end`
                : `text-start`
            }
                  mb-6`}
            aria-live="polite"
          >
            {message.message}
          </li>
        ))}
      </ol>
      <div>
        <label htmlFor="message" className="sr-only">
          Deine Frage
        </label>
        <div className="flex gap-2">
          <div className="relative flex-grow flex-shrink-0">
            {isLoading && (
              <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            )}
            <input
              type="text"
              name="message"
              id="message"
              className="border border-gray-300 rounded-full px-4 pr-12 py-3 w-full"
              placeholder="Deine Frage..."
            />
            <button className="absolute top-2 right-2 p-2 rounded-full">
              <svg
                width="18"
                height="22"
                viewBox="0 0 18 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="presentation"
              >
                <path
                  d="M17.75 9C17.75 8.58579 17.4142 8.25 17 8.25C16.5858 8.25 16.25 8.58579 16.25 9H17.75ZM1.75 9C1.75 8.58579 1.41421 8.25 1 8.25C0.585786 8.25 0.25 8.58579 0.25 9H1.75ZM6.8181 20.2724C6.41625 20.3729 6.17193 20.7801 6.27239 21.1819C6.37285 21.5837 6.78006 21.8281 7.1819 21.7276L6.8181 20.2724ZM7.78732 20.8032L7.60542 20.0756L7.78732 20.8032ZM10.2127 20.8032L10.3946 20.0756L10.2127 20.8032ZM10.8181 21.7276C11.2199 21.8281 11.6271 21.5837 11.7276 21.1819C11.8281 20.7801 11.5837 20.3729 11.1819 20.2724L10.8181 21.7276ZM9 20.6539V21.4039V20.6539ZM12.25 5V9H13.75V5H12.25ZM5.75 9V5H4.25V9H5.75ZM9 12.25C7.20507 12.25 5.75 10.7949 5.75 9H4.25C4.25 11.6234 6.37665 13.75 9 13.75V12.25ZM12.25 9C12.25 10.7949 10.7949 12.25 9 12.25V13.75C11.6234 13.75 13.75 11.6234 13.75 9H12.25ZM9 1.75C10.7949 1.75 12.25 3.20507 12.25 5H13.75C13.75 2.37665 11.6234 0.25 9 0.25V1.75ZM9 0.25C6.37665 0.25 4.25 2.37665 4.25 5H5.75C5.75 3.20507 7.20507 1.75 9 1.75V0.25ZM16.25 9C16.25 13.0041 13.0041 16.25 9 16.25V17.75C13.8325 17.75 17.75 13.8325 17.75 9H16.25ZM9 16.25C4.99594 16.25 1.75 13.0041 1.75 9H0.25C0.25 13.8325 4.16751 17.75 9 17.75V16.25ZM8.25 17V20H9.75V17H8.25ZM7.1819 21.7276L7.96922 21.5308L7.60542 20.0756L6.8181 20.2724L7.1819 21.7276ZM10.0308 21.5308L10.8181 21.7276L11.1819 20.2724L10.3946 20.0756L10.0308 21.5308ZM7.96922 21.5308C8.30761 21.4462 8.6538 21.4039 9 21.4039V19.9039C8.53162 19.9039 8.06323 19.9611 7.60542 20.0756L7.96922 21.5308ZM9 21.4039C9.3462 21.4039 9.69239 21.4462 10.0308 21.5308L10.3946 20.0756C9.93677 19.9611 9.46838 19.9039 9 19.9039V21.4039ZM8.25 20V20.6539H9.75V20H8.25Z"
                  fill="#72777A"
                />
              </svg>
              <span className="sr-only">Spracheingabe</span>
            </button>
          </div>
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
