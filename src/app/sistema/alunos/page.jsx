// src/app/alunos/page.js
"use client";
import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react"
import Image from "next/image";
import api from "@/utils/Api";
import wpp from "../../../../public/wpp.png";
import Loading from "@/components/Loading";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);

  const buscarAlunos = async () => {
    setLoading(true);
    try {
      const response = await api.get("/alunos");
      setAlunos(response.data);
      console.log(response.data);
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
      <h1 className="text-2xl text-red-500 font-bold mb-4">Alunos</h1>

      <table className="hidden md:table w-full text-left border-collapse">

        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600">
              Nome
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600">
              Nome de Guerra
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600">
              Post/Grad
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600">
              Telefone
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600">
              Matrícula
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600 text-right">
              Ações
            </th>
          </tr>
        </thead>

        <tbody>
          {alunos.map((aluno) => (
            <tr
              key={aluno.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 font-medium text-gray-900">
                {aluno?.nome?.toUpperCase()}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {aluno?.nome_guerra?.toUpperCase()}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {aluno?.post_grad?.toUpperCase()}
              </td>
              <td className="flex flex-row justify-center items-center gap-2 px-6 py-4 text-gray-600">
                {aluno.whatsapp ? aluno.whatsapp : "N/A"}
                <a href={`http://wa.me/${aluno?.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <Image
                    alt=""
                    src={wpp}
                    width={30}
                    height={30}
                    className="ml-2 cursor-pointer"
                  />
                </a>
              </td>
              <td className="px-6 py-4 text-gray-600">
                {aluno.matricula}
              </td>
              <td className="px-6 py-4 text-right space-x-3">


              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {alunos.map((aluno) => (
        <div key={aluno.id} className="md:hidden flex flex-row justify-between border p-4 rounded-lg mb-4">
          <div className="text-gray-500 w-full">
            <div className="flex flex-row w-full justify-between">
              <h2 className="text-xl font-bold">{aluno.nome}</h2>
              <a href={`http://wa.me/${aluno?.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <Image
                  alt=""
                  src={wpp}
                  width={40}
                  height={40}
                  className="ml-2 cursor-pointer"
                />
              </a>
            </div>
            <p>Nome de Guerra: {aluno.nome_guerra}</p>
            <p>Post/Grad: {aluno.post_grad}</p>
            <p>Telefone: {aluno.whatsapp}</p>
            <p>Matrícula: {aluno.matricula}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
          </div>
        </div>

      ))}
    </div>
  );
}

