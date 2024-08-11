import { Converter } from "@/components";

export default function Home() {
  return (
    <main >
      <h1 className="text-center text-4xl mt-10">Convertidor de Moneda</h1>
      <section className="mx-auto px-[6%] mt-20">
        <Converter />
      </section>
    </main>
  );
}
