import OpenAI from "openai";
import { giveSystemPrompt } from "./system_prompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type ChatMessage = {
  message: string;
  role: "user" | "system";
};

export type ChatInput =
  | {
      message: ChatMessage["message"];
      history?: Array<ChatMessage>;
    }
  | {
      init: {
        productImage: string;
        productImageAlt?: string;
        productDescription: string;
      };
    };

export type ChatOutput = {
  message?: string | null;
  action?: "close" | "buy";
};

export const runtime = "edge";

export async function POST(req: Request) {
  const { message, history, init } = await req.json();

  let historyString = "";
  if (history && history.length > 0) {
    history.forEach((chatMessage: ChatMessage) => {
      // Capitalize the first letter of the role and append the message
      const role = chatMessage.role.charAt(0).toUpperCase() + chatMessage.role.slice(1);
      // Append formatted message to historyString
      historyString += `${role}: ${chatMessage.message}\n`;
    });
  }

  if (init) {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: giveSystemPrompt(historyString),
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                "url": init.productImage,
              }
            },
            {
              type: "text",
              text: init.productImageAlt ? "ALT text: " + init.productImageAlt : "none",
            },
            {
              type: "text",
              text: init.productDescription,
            }
          ]
        }
      ],
    });

    const responseToReturn: ChatOutput = {
      message: response.choices[0].message.content,
    };

    return Response.json(responseToReturn);
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      {
        role: "system",
        content: giveSystemPrompt(historyString),
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: message,
          }
        ]
      }
    ],
  });

  const responseToReturn: ChatOutput = {
    message: response.choices[0].message.content,
  };

  return Response.json(responseToReturn);
}
