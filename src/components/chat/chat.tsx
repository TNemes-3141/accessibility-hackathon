"use client";
import { useEffect, useState } from "react";
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
      .then(({ message }) => setMessages([{ role: "system", message }]));
  }, [productImage, productDescription, productImageAlt]);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const form = event.currentTarget as HTMLFormElement;
        const data = new FormData(form);

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
      }}
    >
      <ol>
        {messages.map((message, index) => (
          <li
            key={index}
            className={`${message.role === "system" ? `text-end` : `text-start`}
                  mb-2`}
          >
            {message.message}
          </li>
        ))}
      </ol>
      <div className="d-flex">
        <label htmlFor="message" className="sr-only">
          Deine Frage
        </label>
        <input
          type="text"
          name="message"
          id="message"
          className="border border-gray-300 rounded-md rounded-r-none p-2"
          placeholder="Deine Frage"
        />
        <button
          type="submit"
          className="border border-gray-300 rounded-md rounded-l-none p-2"
          style={{
            marginLeft: "-1px",
          }}
        >
          Frage stellen
        </button>
      </div>
    </form>
  );
}
