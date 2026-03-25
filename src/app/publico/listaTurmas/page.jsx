"use client";
import { useState, useEffect, useMemo } from "react";
import moment from "moment";
import { useRouter } from "next/navigation";
import api from "@/utils/Api";

export default function ListaTurmas() {
  const [turmas, setTurmas] = useState([]);
  const router = useRouter();
  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroPublico, setFiltroPublico] = useState("");

  const buscarTurmas = async () => {
    try {
      const response = await api.get("/turmas");
      setTurmas(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
    }
  }

  useEffect(() => {
    buscarTurmas();
  }, []);

  useEffect(() => {
    console.log("Filtro de texto:", filtroTexto);
    console.log("Filtro de público:", filtroPublico);
  }, [filtroTexto, filtroPublico]);

  const turmasFiltradas = useMemo(() => {
    return turmas.filter((t) => {
      const matchTexto =
        !filtroTexto ||
        t.titulo?.toLowerCase().includes(filtroTexto.toLowerCase());

      const matchPublico =
        !filtroPublico ||
        t.publico === filtroPublico;

      return matchTexto && matchPublico;
    });
  }, [turmas, filtroTexto, filtroPublico]);

  return (
    <div className="">
      <div className="flex flex-col w-full max-w-7xl mx-auto justify-center mt-10 px-2">

        <div className="flex md:flex-row flex-col gap-5">
          <input
            type="text"
            onChange={(e) => setFiltroTexto(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            placeholder="Buscar capacitação ..." />

          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          >
            <option value="">Todos os públicos</option>
            <option value="categoria1">Exclusivo QBMG-2</option>
            <option value="categoria3">Geral</option>
          </select>
        </div>

        <div className="flex flex-col pt-10 gap-2">
          <h1 className="flex">Próximas Capacitações...</h1>
          <div className="flex w-full h-1 bg-red-700"></div>
        </div>


        <div>
          {/*cards*/}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 mb-2">

            {turmasFiltradas.map((t) => (
              <div key={t.id_turma} className="flex flex-col w-full border border-gray-300 rounded-lg shadow-md">
                <div className="bg-red-700 p-4 rounded-t-lg">
                  <h2 className="text-xl text-white font-bold mb-2">{t.titulo}</h2>
                </div>
                <div className="flex flex-col p-4 gap-4">
                  <p><span className="font-bold">Data: </span> {moment(t.dt_inicio).format("DD/MM/YYYY")}</p>
                  <p><span className="font-bold">Horário: </span>{t.horario}</p>
                  <p><span className="font-bold">Local: </span> {t.local}</p>
                  <p><span className="font-bold">Carga horária: </span> {t.carga_horaria}h</p>
                  <p>{t.descricao}</p>

                  <button
                    onClick={() => router.push(`/publico/inscricao?id_turma=${t.id_turma}`)}
                    className="self-start px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600 cursor-pointer transition-colors">
                    Inscrever-se
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
