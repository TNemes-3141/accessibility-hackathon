"use client";
import { RatingStars } from "@/components/ratingStars/ratingStars";
import { useEffect, useRef, useState } from "react";
import { Chat } from "../components/chat/chat";
import { AssistantButton } from "@/components/assistantButton/assistantButton";
import { Cart, Help } from "@/components/icon/icon";

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
            <AssistantButton dialogRef={dialogRef} />
            <img
              src={productImageSrc}
              alt={productImageAlt}
              className="max-w-48"
              ref={imageRef}
            />
          </div>
          <div>
            <div className="flex flex-col-reverse">
              <h1 className="text-xl font-bold mb-2">{productTitle}</h1>
              <strong className="text-xl">509 CHF</strong>
            </div>
            <section>
              <RatingStars />
              <div className="mt-7">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-full flex gap-3 items-center focus-visible:outline-offset-4"
                  type="button"
                  id="addToCartButton"
                  data-test="addToCartButton"
                  title="In den Warenkorb"
                >
                  <Cart />
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
        <Chat
          productImage={productImage}
          productImageAlt={productImageAlt}
          productDescription={productDescription}
        />
      </dialog>
    </main>
  );
}
