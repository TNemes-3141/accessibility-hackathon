"use client";
import { useState } from "react";
import type { ChatResponse } from "../../app/api/chat/route";

type MessageRole = "user" | "system";

export function Chat() {
  const [messages, setMessages] = useState<
    Array<{ role: MessageRole; message: string }>
  >([]);

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
          body: JSON.stringify({ message: data.get("message") }),
        }).then((response) => response.json())) as ChatResponse;

        const newMessages = [
          ...messages,
          {
            role: "user" as MessageRole,
            message: String(data.get("message")),
          },
        ];

        if (response.message) {
          newMessages.push({
            role: "system" as MessageRole,
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
