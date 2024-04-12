export default function Home() {
  return (
    <main>
      <h1 className="text-xl font-bold">Accessibility Hackathon</h1>
      <p>E-Commerce Chatbot für Bildbeschreibungen</p>

      <section>
        <h2>Samsung NV70K1340BS/EG</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www.digitec.ch/im/Files/3/0/8/0/6/2/2/8/de-electric-oven-nv70k1340bs-nv70k1340bs-eg-frontsilver-68068844?impolicy=ProductTileImage&resizeWidth=992&resizeHeight=963&cropWidth=992&cropHeight=963&quality=high"
          alt=""
        />
        <button type="button">Fragen zum Bild stellen</button>
      </section>
    </main>
  );
}
