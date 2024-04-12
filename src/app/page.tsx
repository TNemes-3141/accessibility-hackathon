"use client";
import { RatingStars } from "@/components/ratingStars/ratingStars";
import { useEffect, useRef, useState } from "react";
import { Chat } from "../components/chat/chat";
import { AssistantButton } from "@/components/assistantButton/assistantButton";
import { Cart, Close } from "@/components/icon/icon";

export default function Home() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [productImage, setProductImage] = useState<string>("");

  const productTitle = "Samsung NV70K1340BS/EG";
  const productImageSrc = "/oven.avif";
  const productImageAlt = "Einbau-Backofen Samsung NV70K1340BS";
  const productDescription = `Der Einbau-Backofen Samsung NV70K1340BS überzeugt mit einem Nutzinahlt von 70 Litern. Fünf Heizarten inklusive Grill und Pizzastufe machen das Kochen, Backen und Garen für angehende Köche zur Leichtigkeit. Zwei Ventilatoren verteilen die Hitze gleichmässig im ganzen Garraum - ganz gleich, ob auf einer oder auf mehreren Ebenen gegart wird. Auch die Reinigung und Pflege des NV70K1340BS geht dank emaillierter Backofeninnenwände und katalytisch-selbstreinigender Rückwand wie von selbst. Bei der Katalyse-Technik werden bei hohen Temperaturen von über 200 °C vorhandene Fettablagerungen einfach abgebaut. Darüber hinaus überzeugt der NV70K1340BS mit einer Kindersicherung, einem LED-Display mit Timer sowie der Energieeffizienzklasse A.`;
  const productSpecification = `Norm	
EU-Norm 60cm
Garraumvolumen	
70 l
Breite	
59.50 cm
Tiefe	
56.60 cm
Höhe	
59.50 cm
Farbe	
Silber
Artikelnummer	
12240816
Allgemeine Informationen
Hersteller	
Samsung
Kategorie	
Backofen Einbaui
Herstellernr.	
NV70K1340BS/EG
Release-Datum	
28.10.2019
Ist möglicherweise mit einem Stromadapter ausgestattet	
Jai
Farbe
Farbgruppe	
Silber
Genaue Farbbezeichnung	
Schwarz, Silber
Material
Genaue Materialbezeichnung	
Keramiki
Grossgerät Bauform
Norm	
EU-Norm 60cm
Einbauform	
Integrierbari
Türanschlag	
Unten
Grossgerät Eigenschaften
Garraumvolumen	
70 l
Beheizungsart	
Heissluft, Ober- und Unterhitze, Umluft
Energieversorgungi
Energieverbrauch Garen Konventionell	
0.99 kWh
Spannung	
230 V
Energiedeklaration
Energieeffizienzklasse 2020	
A
Produktdimensionen
Breite	
59.50 cm
Tiefe	
56.60 cm
Höhe	
59.50 cm
Nischenbreite	
56 cm
Nischentiefe	
54.50 cm
Nischenhöhe	
57.20 cm
Gewicht	
32.60 kg
Klimabeitrag
Du kannst freiwillig in der Kasse einen Klimabeitrag leisten. Mehr erfahren

CO₂-Emission	
196.06 kg
Klimabeitrag	
CHF 4.66
Verpackungsdimensionen
Länge	
70 cm
Breite	
70 cm
Höhe	
70 cm
Gewicht	
38 kg`;

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
    <div className="flex flex-col min-h-screen">
      <main>
        <div className="container mx-auto my-10 px-4">
          <div className="flex gap-10">
            <div className="order-1">
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
                    title="In den Warenkorb"
                  >
                    <Cart />
                    In den Warenkorb
                  </button>
                </div>
              </section>
            </div>
            <div className="relative">
              <AssistantButton dialogRef={dialogRef} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={productImageSrc}
                alt={productImageAlt}
                className="max-w-48"
                ref={imageRef}
              />
            </div>
          </div>
        </div>
        <dialog
          ref={dialogRef}
          className="p-5 shadow-md rounded-md max-w-screen-md absolute mb-0 mt-auto md:relative md:mt-auto md:mb-auto md:min-w-[800px]"
        >
          <button
            className="absolute top-2 right-2 rounded-full"
            onClick={() => dialogRef.current?.close()}
          >
            <span className="sr-only">Schliessen</span>
            <Close />
          </button>
          <h2 className="mb-4 text-l font-bold">Stelle Fragen zum Produkt</h2>
          <Chat
            productImage={productImage}
            productImageAlt={productImageAlt}
            productDescription={productDescription}
            productSpecification={productSpecification}
            dialogRef={dialogRef}
          />
        </dialog>
      </main>
      <footer className="mt-auto">
        <p className="container mx-auto my-10 px-4">
          Code:{" "}
          <a
            href="https://github.com/Totemi1324/accessibility-hackathon"
            className="underline"
          >
            GitHub Repository
          </a>
        </p>
      </footer>
    </div>
  );
}
