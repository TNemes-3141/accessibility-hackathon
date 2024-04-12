"use client";
import { RatingStars } from "@/components/ratingStars/ratingStars";
import { useRef } from "react";
import { Chat } from "../components/chat/chat";
import { AssistantButton } from "@/components/assistantButton/assistantButton";

export default function Home() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <main>
      <div className="container mx-auto my-10">
        <div className="flex gap-10">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/oven.avif" alt="" className="max-w-48" />
            <AssistantButton dialogRef={dialogRef} />
          </div>
          <div>
            <div className="flex flex-col-reverse">
              <h1 className="text-xl font-bold mb-2">Samsung NV70K1340BS/EG</h1>
              <strong className="text-xl">509 CHF</strong>
            </div>
            <section>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <RatingStars />
              <div className="mt-7">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-full flex gap-3 items-center focus-visible:outline-offset-4"
                  type="button"
                  id="addToCartButton"
                  data-test="addToCartButton"
                  title="In den Warenkorb"
                >
                  <svg fill="none" viewBox="0 0 16 16" width="16" height="16">
                    <path
                      fill="#fff"
                      fill-rule="evenodd"
                      d="M15 4H3.728l2.225 6.113L15 8.19zm1-1v6L5.311 11.272 1.936 2H0V1h2.636l.728 2zM3.5 12a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M14 13.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  In den Warenkorb
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
      <dialog
        ref={dialogRef}
        className="p-5 shadow-md rounded-md max-w-screen-md absolute mb-0 mt-auto md:relative md:mt-auto md:mb-auto md:min-w-[800px]"
      >
        <button
          className="absolute top-2 right-2"
          onClick={() => dialogRef.current?.close()}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M31.4697 32.5304C31.7626 32.8233 32.2375 32.8233 32.5304 32.5304C32.8233 32.2375 32.8233 31.7626 32.5304 31.4697L31.4697 32.5304ZM16.5303 15.4697C16.2374 15.1768 15.7626 15.1768 15.4697 15.4697C15.1768 15.7626 15.1768 16.2374 15.4697 16.5303L16.5303 15.4697ZM32.5304 31.4697L16.5303 15.4697L15.4697 16.5303L31.4697 32.5304L32.5304 31.4697Z"
              fill="#72777A"
            />
            <path
              d="M32.5303 16.5303C32.8232 16.2374 32.8232 15.7625 32.5303 15.4696C32.2374 15.1767 31.7626 15.1767 31.4697 15.4696L32.5303 16.5303ZM15.4696 31.4697C15.1767 31.7626 15.1767 32.2374 15.4696 32.5303C15.7625 32.8232 16.2374 32.8232 16.5303 32.5303L15.4696 31.4697ZM31.4697 15.4696L15.4696 31.4697L16.5303 32.5303L32.5303 16.5303L31.4697 15.4696Z"
              fill="#72777A"
            />
          </svg>
        </button>
        <h2 className="mb-4 text-l font-bold">Stelle Fragen zum Produkt</h2>
        <Chat />
      </dialog>
    </main>
  );
}
