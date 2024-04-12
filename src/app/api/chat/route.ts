import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type ChatResponse = {
  message?: string | null;
  action?: "close" | "buy";
};

export type ChatInput = {
  message: string;
};

export type ChatInputInit = {
  init: {
    productImage: string;
    productImageAlt?: string;
    productDescription: string;
  };
};

export const runtime = "edge";

export async function POST(req: Request) {
  const { message, init } = await req.json();

  if (init) {
    // TODO: fetch initial response
    return Response.json({
      message: "Dieses Bild zeigt ...",
    });
  }

  const apiResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
  });
  const response: ChatResponse = {
    message: apiResponse.choices[0].message.content,
  };

  return Response.json(response);
}
