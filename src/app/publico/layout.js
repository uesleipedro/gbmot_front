import "../globals.css";
import Image from "next/image";
import logo from "../../../public/gemot.svg";

export const metadata = {
  title: "GBMOT",
  description: "Sistema base",
};

export default function PublicoLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`bg-gray-50`}>
        <div className="flex flex-row items-center h-25 bg-red-700 p-3 gap-4">
          <div className="bg-white rounded-full p-1">
            <Image
              src={logo}
              alt="Logomarca"
              width={70}
              height={70}
              className="basis-1/5"
            />
          </div>
          <div className="text-white">
            <h1 className="font-bold text-xl">
              Grupamento de Bombeiro Militar de Motomecanização
            </h1>

            <p>
              Portal de Capacitações e Treinamentos
            </p>
          </div>
        </div>

        <main className="">
          {children}
        </main>
      </body>
    </html>
  );
}
