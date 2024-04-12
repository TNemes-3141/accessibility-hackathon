"use client";
import { useEffect, useState } from "react";
import { SubmitButton } from "./submitButton";
import type { ChatMessage, ChatOutput } from "../../app/api/chat/route";
import { VoiceInput } from "../icon/icon";

export function Chat({
  productImage,
  productDescription,
  productImageAlt,
  productSpecification,
}: {
  productImage: string;
  productDescription: string;
  productImageAlt: string;
  productSpecification: string;
}) {
  const [messages, setMessages] = useState<Array<ChatMessage>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

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
          productSpecification,
        },
      }),
    })
      .then((response) => response.json())
      .then(({ message }) => {
        setMessages([{ role: "system", message }]);

        setIsInitializing(false);
      });
  }, [productImage, productDescription, productImageAlt, productSpecification]);

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
      {isInitializing && (
        <p className="mb-6">Unser Chatbot analyisiert gerade das Produkt...</p>
      )}
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
            {(isLoading || isInitializing) && (
              <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            )}
            <input
              type="text"
              name="message"
              id="message"
              className="border border-gray-500 rounded-full px-4 pr-12 py-3 w-full placeholder:text-stone-500"
              placeholder="Deine Frage..."
            />
            <button className="absolute top-2 right-2 p-2 rounded-full">
              <span className="sr-only">Spracheingabe</span>
              <VoiceInput />
            </button>
          </div>
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
