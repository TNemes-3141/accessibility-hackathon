"use client";
import { RatingStars } from "@/components/ratingStars/ratingStars";
import { useEffect, useRef, useState } from "react";
import { Chat } from "../components/chat/chat";

export default function Home() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [productImage, setProductImage] = useState<string>("");

  const productTitle = "Samsung NV70K1340BS/EG";
  const productImageSrc = "/oven.avif";
  const productImageAlt = "Einbau-Backofen Samsung NV70K1340BS";
  const productDescription = `Der Einbau-Backofen Samsung NV70K1340BS überzeugt mit einem Nutzinahlt von 70 Litern. Fünf Heizarten inklusive Grill und Pizzastufe machen das Kochen, Backen und Garen für angehende Köche zur Leichtigkeit. Zwei Ventilatoren verteilen die Hitze gleichmässig im ganzen Garraum - ganz gleich, ob auf einer oder auf mehreren Ebenen gegart wird. Auch die Reinigung und Pflege des NV70K1340BS geht dank emaillierter Backofeninnenwände und katalytisch-selbstreinigender Rückwand wie von selbst. Bei der Katalyse-Technik werden bei hohen Temperaturen von über 200 °C vorhandene Fettablagerungen einfach abgebaut. Darüber hinaus überzeugt der NV70K1340BS mit einer Kindersicherung, einem LED-Display mit Timer sowie der Energieeffizienzklasse A.`;

  const setImage = (image: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    ctx?.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);

    setProductImage(canvas.toDataURL());
  };

  useEffect(() => {
    if (!imageRef.current) return;

    if (imageRef.current.complete) {
      setImage(imageRef.current);
    } else {
      imageRef.current.addEventListener("load", () => {
        if (imageRef.current) {
          setImage(imageRef.current);
        }
      });
    }
  }, []);

  return (
    <main>
      <div className="container mx-auto my-10">
        <div className="flex gap-10">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={productImageSrc}
              alt=""
              className="max-w-48"
              ref={imageRef}
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
          <div>
            <div className="flex flex-col-reverse">
              <h1 className="text-xl font-bold mb-2">{productTitle}</h1>
              <strong className="text-xl">509 CHF</strong>
            </div>
            <section>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <RatingStars />
              <div className="mt-7">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-full flex gap-3 items-center focus-visible:outline-offset-4"
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
      <dialog ref={dialogRef} className="p-5 shadow-md rounded-md">
        <h2 className="text-l font-bold">Stelle Fragen zum Produkt</h2>
        <Chat
          productImage={productImage}
          productImageAlt={productImageAlt}
          productDescription={productDescription}
        />
      </dialog>
    </main>
  );
}
