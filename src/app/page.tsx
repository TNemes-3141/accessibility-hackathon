"use client";
import { useRef } from "react";

export default function Home() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <main>
      <div className="container mx-auto my-10">
        <h1 className="text-xl font-bold">Samsung NV70K1340BS/EG</h1>
        <p>E-Commerce Chatbot für Bildbeschreibungen</p>
        <section>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.digitec.ch/im/Files/3/0/8/0/6/2/2/8/de-electric-oven-nv70k1340bs-nv70k1340bs-eg-frontsilver-68068844?impolicy=ProductTileImage&resizeWidth=992&resizeHeight=963&cropWidth=992&cropHeight=963&quality=high"
              alt=""
              className="max-w-48"
            />
            <button
              type="button"
              className="absolute bottom-0 border-radius-50"
              onClick={() => {
                dialogRef.current?.showModal();
              }}
            >
              <span className="sr-only">Fragen zum Bild stellen</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <svg
                style={{ stroke: "white", fill: "white" }}
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="presentation"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 9L12 10M17 9L12 10M12 10V13M12 13L10 18M12 13L14 18"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 7C11.7239 7 11.5 6.77614 11.5 6.5C11.5 6.22386 11.7239 6 12 6C12.2761 6 12.5 6.22386 12.5 6.5C12.5 6.77614 12.2761 7 12 7Z"
                  fill="#000000"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </section>
      </div>
      <dialog ref={dialogRef} className="fixed bottom-0 right-0">
        <h2>Stelle Fragen zum Produkt</h2>
      </dialog>
    </main>
  );
}
