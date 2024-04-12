"use client";
import { RatingStars } from "@/components/ratingStars/ratingStars";
import { useEffect, useRef, useState } from "react";
import { Chat } from "../components/chat/chat";
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
            <img
              src={productImageSrc}
              alt={productImageAlt}
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
              <Help />
            </button>
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
                  className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-full flex gap-3 items-center focus-visible:outline-offset-4"
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
