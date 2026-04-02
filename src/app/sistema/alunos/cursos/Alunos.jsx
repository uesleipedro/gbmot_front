"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Edit, Trash2 } from "lucide-react"
import Image from "next/image";
import api from "@/utils/Api";
import Loading from "@/components/Loading";
import { useSearchParams } from "next/navigation";
import moment from "moment";

export default function Alunos({ params }) {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const id_aluno = searchParams.get("id_aluno");

  const buscarAlunos = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/cursos/aluno?id_aluno=${id_aluno}`);
      setCursos(response.data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscarAlunos();
  }, []);

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <h1 className="text-2xl text-red-500 font-bold mb-4">CURSOS CONCLUÍDOS</h1>
      <h1 className="text-xl text-gray-500 font-bold mb-4">{cursos[0].post_grad.toUpperCase()} - {cursos[0].nome}</h1>

      <table className="hidden md:table w-full text-left border-collapse">

        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600">
              Curso
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600">
              Data Inscrição
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600">
              Data Conclusão
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600">
              Período
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600 text-right">
              Ações
            </th>
          </tr>
        </thead>

        <tbody>
          {cursos.map((c, index) => (
            <tr
              key={index}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 font-medium text-gray-900">
                {c.curso}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {moment(c.dt_inscricao).format("DD/MM/YYYY")}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {moment(c.dt_conclusao).format("DD/MM/YYYY")}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {moment(c.dt_inicio).format("DD/MM/YYYY")} - {moment(c.dt_fim).format("DD/MM/YYYY")}
              </td>
              <td className="px-6 py-4 text-right space-x-3">


              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {cursos.map((c, index) => (
        <div key={index} className="md:hidden flex flex-row justify-between border p-4 rounded-lg mb-4">
          <div className="text-gray-500 w-full">
            <div className="flex flex-row w-full justify-between">
              <h2 className="text-xl font-bold">{c.curso}</h2>

            </div>
            <p>Data Inscrição: {moment(c.dt_inscricao).format("DD/MM/YYYY")}</p>
            <p>Data Conclusão: {moment(c.dt_conclusão).format("DD/MM/YYYY")}</p>
            <p>Período: {moment(c.dt_inicio).format("DD/MM/YYYY")} - {moment(c.dt_fim).format("DD/MM/YYYY")}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
          </div>
        </div>

      ))}
    </div>
  );
}

