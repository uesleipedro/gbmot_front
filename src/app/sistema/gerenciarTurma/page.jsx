"use client";

import { useState, useEffect, useMemo } from "react";
import { Edit, Trash2, EllipsisVertical } from "lucide-react"
import Image from "next/image";
import api from "@/utils/Api";
import wpp from "../../../../public/wpp.png";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import DropdownMenu from "./DropdownMenu";
import Swal from "sweetalert2";
import Loading from "@/components/Loading";

export default function GerenciarTurma() {
  const [alunos, setAlunos] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroPostGrad, setFiltroPostGrad] = useState("");
  const [filtroLotacao, setFiltroLotacao] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [postGrad, setPostGrad] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const idTurma = searchParams.get('id_turma');
  const [selecionados, setSelecionados] = useState([]);
  const router = useRouter();

  useEffect(() => {
    buscarPostGrad();
  }, []);

  const openFichaChamada = () => {
    sessionStorage.setItem("alunos", JSON.stringify(alunos.filter(aluno => aluno.status === "consolidado")));
    router.push("/sistema/fichaChamada");
  }

  const menu = [
    { label: "Consolidar Alunos selecionados", onClick: () => updateStatusTurmaAluno() },
    { label: "Consolidar a Turma", onClick: () => consolidarTruma() },
    { label: "Concluir Turma", onClick: () => openFichaChamada() },
    { label: "Ficha de Chamada", onClick: () => openFichaChamada() },
  ]

  const buscarAlunos = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/turmas/alunos/${idTurma}`);
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    } finally {
      setLoading(false);
    }

  }

  const buscarPostGrad = () => {
    api.get("/post_grad").then((response) => {
      setPostGrad(response.data)
    }).catch((error) => {
      console.error("Erro ao buscar post/grad!")
    })
  }

  useEffect(() => {
    buscarAlunos();
  }, [idTurma]);

  const updateStatusTurmaAluno = () => {
    if (!selecionados.length) {
      Swal.fire("Nenhum aluno selecionado!", "Selecione os alunos que deseja consolidar.", "warning");
      return;
    }

    api.put("/turma_aluno", selecionados).then((response) => {
      buscarAlunos()
      Swal.fire("Alunos consolidados com sucesso!")
    }).catch((error) => {
      console.error("Erro ao consolidar alunos!", error)
    })
  }

  const consolidarTruma = () => {
    api.put('/turmas/consolidar_turma', { id_turma: idTurma })
      .then((response) => {
        buscarAlunos();
        Swal.fire("Turma consolidada com sucesso!");
      }).catch((error) => {
        console.error("Erro ao consolidar turma!", error);
        Swal.fire("Erro ao consolidar turma!", "Não foi possível consolidar a turma, entre em contato com o suporte", "error");
      })
  }

  const filteredAlunos = useMemo(() => {
    return alunos.filter((item) => {
      const matchNome = item.nome
        .toLowerCase()
        .includes(filtroTexto.toLowerCase());

      const matchPosto = item.post_grad
        .toLowerCase()
        .includes(filtroPostGrad.toLowerCase());

      const matchLotacao = item.lotacao
        .toLowerCase()
        .includes(filtroLotacao.toLowerCase());

      const matchStatus = item.status
        .toLowerCase()
        .includes(filtroStatus.toLowerCase());

      return matchNome && matchPosto && matchLotacao && matchStatus;
    });
  }, [alunos, filtroTexto, filtroPostGrad, filtroLotacao, filtroStatus]);

  if (loading) return <Loading />

  return (
    <div>
      <div className="flex flex-col py-2">
        <h1 className="text-2xl text-red-500 font-bold">Gerenciar Turma</h1>
        <h1 className="text-2xl text-red-500 font-bold">{alunos[0]?.id_turma == 1 ? 'RESERVA' : alunos[0]?.curso}</h1>
      </div>

      <p><span className="font-bold">Status:</span> {alunos[0]?.status_turma}</p>

      <p className="py-4 font-bold">Selecionados: {selecionados.length}</p>

      <div className="flex gap-5">

        <div
          className={`${filtroStatus === '' ? 'bg-red-700 text-white' : 'bg-white text-gray-600'} border font-bold px-3 py-2 rounded-lg cursor-pointer`}
          onClick={() => { setFiltroStatus(""); setSelecionados([]) }}>
          Todos</div>
        <div
          className={`${filtroStatus === 'pre-inscrito' ? 'bg-red-700 text-white' : 'bg-white text-gray-600'} border font-bold px-3 py-2 rounded-lg cursor-pointer`}
          onClick={() => { setFiltroStatus("pre-inscrito"); setSelecionados([]) }}>
          Pré-Inscritos</div>
        <div
          className={`${filtroStatus === 'consolidado' ? 'bg-red-700 text-white' : 'bg-white text-gray-600'} border font-bold px-3 py-2 rounded-lg cursor-pointer`}
          onClick={() => { setFiltroStatus("consolidado"); setSelecionados([]) }}>Consolidados</div>

        <DropdownMenu items={menu} />
      </div>

      <div className="flex flex-col py-5 gap-2">
        <div className="flex md:flex-row flex-col gap-5">
          <input
            type="text"
            onChange={(e) => setFiltroTexto(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            placeholder="Buscar por nome" />

          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            onChange={(e) => setFiltroPostGrad(e.target.value)}
          >
            <option value="">--- Selecionar Posto/Graduação ---</option>
            {postGrad.map((pg) => (
              <option key={pg.id_post_grad} value={pg.abreviacao}>{pg.abreviacao}</option>
            ))}
          </select>

          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            onChange={(e) => setFiltroLotacao(e.target.value)}
          >
            <option value="">--- Lotação ---</option>
            {alunos.map((al) => (
              <option key={al.matricula} value={al.lotacao}>{al.lotacao}</option>
            ))}
          </select>
        </div>
      </div>

      <table className="hidden md:table w-full text-left border-collapse">

        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 text-sm font-semibold text-gray-600">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelecionados(
                      filteredAlunos.map((a) => ({
                        id_aluno: a.id_aluno,
                        id_turma: a.id_turma,
                      }))
                    );
                  } else {
                    setSelecionados([]);
                  }
                }}
                checked={
                  filteredAlunos.length > 0 &&
                  selecionados.length === filteredAlunos.length
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </th>
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
          {filteredAlunos.map((aluno, index) => (
            <tr
              key={aluno.id_aluno}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 font-medium text-gray-900">
                <input
                  type="checkbox"
                  checked={selecionados.some(
                    (s) =>
                      s.id_aluno === aluno.id_aluno &&
                      s.id_turma === aluno.id_turma
                  )}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelecionados((prev) => [
                        ...prev,
                        {
                          id_aluno: aluno.id_aluno,
                          id_turma: aluno.id_turma,
                        },
                      ]);
                    } else {
                      setSelecionados((prev) =>
                        prev.filter(
                          (s) =>
                            !(
                              s.id_aluno === aluno.id_aluno &&
                              s.id_turma === aluno.id_turma
                            )
                        )
                      );
                    }
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">
                {aluno?.nome.toUpperCase()}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {aluno?.nome_guerra?.toUpperCase()}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {aluno?.post_grad?.toUpperCase()}
              </td>
              <td className="flex flex-row justify-center items-center gap-2  py-4 text-gray-600">
                {aluno.whatsapp ? aluno.whatsapp : "N/A"}
                <a href={`http://wa.me/${aluno?.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <Image
                    alt="WhatsApp"
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

                <button className="text-sm text-red-500 hover:text-red-400 font-medium cursor-pointer">
                  <Trash2 />
                </button>

              </td>
            </tr>
          ))}
        </tbody>

      </table>

      <div className={`${filteredAlunos.length <= 0 && 'hidden'} flex md:hidden w-full justify-center items-center py-5`}>
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) {
              setSelecionados(
                filteredAlunos.map((a) => ({
                  id_aluno: a.id_aluno,
                  id_turma: a.id_turma,
                }))
              );
            } else {
              setSelecionados([]);
            }
          }}
          checked={
            filteredAlunos.length > 0 &&
            selecionados.length === filteredAlunos.length
          }
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </div>
      {filteredAlunos.map((aluno) => (
        <div key={aluno.id_aluno} className="md:hidden flex flex-row justify-between border p-4 rounded-lg mb-4">
          <div className="text-gray-500">
            <input
              type="checkbox"
              checked={selecionados.some(
                (s) =>
                  s.id_aluno === aluno.id_aluno &&
                  s.id_turma === aluno.id_turma
              )}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelecionados((prev) => [
                    ...prev,
                    {
                      id_aluno: aluno.id_aluno,
                      id_turma: aluno.id_turma,
                    },
                  ]);
                } else {
                  setSelecionados((prev) =>
                    prev.filter(
                      (s) =>
                        !(
                          s.id_aluno === aluno.id_aluno &&
                          s.id_turma === aluno.id_turma
                        )
                    )
                  );
                }
              }}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />

            <h2 className="text-xl font-bold">{aluno.nome}</h2>
            <p>Nome de Guerra: {aluno.nome_guerra}</p>
            <p>Post/Grad: {aluno.post_grad}</p>
            <p>Telefone: {aluno.telefone}</p>
            <p>Matrícula: {aluno.matricula}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-5">

            <button className="text-sm text-red-500 hover:text-red-400 font-medium cursor-pointer">
              <Trash2 />
            </button>

          </div>
        </div>

      ))
      }
    </div >
  );
}

