"use client";
import { useState, useEffect, useMemo } from "react";
import { Edit, Trash2, Settings } from "lucide-react";
import Swal from "sweetalert2";
import moment from "moment";
import { useRouter } from "next/navigation";
import api from "@/utils/Api";
import Loading from "@/components/Loading";

export default function Cursos() {
  const [moddal, setModdal] = useState(false);
  const [cursos, setCursos] = useState({});
  const [dados, setDados] = useState({});
  const [alunos, setAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("Aberto");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const statusColor = {
    aberto: "text-blue-800",
    andamento: "text-yellow-800",
    concluido: "text-green-800",
    cancelada: "text-red-800",
  };

  const getCursos = () => {
    api
      .get("/cursos")
      .then((response) => {
        setCursos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar cursos!");
      });
  };

  const getTurmas = () => {
    setLoading(true);
    api
      .get("/turmas")
      .then((response) => {
        setTurmas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar turmas!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCursos();
    getTurmas();
  }, []);

  const updateField = (e) => {
    const fieldName = e.target.name;

    setDados((existingValues) => ({
      ...existingValues,
      [fieldName]: e.target.value,
    }));
  };

  const formatHora = (value) => {
    value = value.replace(/\D/g, "");
    value = value.slice(0, 4);

    if (value.length <= 2) {
      return value;
    }

    return value.slice(0, 2) + ":" + value.slice(2);
  };

  const handleChangeHour = (e) => {
    const formatted = formatHora(e.target.value);
    updateField({
      target: {
        name: e.target.name,
        value: formatted,
      },
    });
  };

  const salvarTurma = (e) => {
    e.preventDefault();

    if (dados.id_turma) {
      atualizarTurma();
      return;
    }

    inserirTurma();
  };

  const inserirTurma = () => {
    let arrDados = dados;
    arrDados.id_curso = parseInt(dados.id_curso);
    api
      .post("/turmas", arrDados)
      .then((response) => {
        setModdal(false);
        setDados({});
        getTurmas();
        Swal.fire("Cadastrado com sucesso!");
      })
      .catch((error) => {
        Swal.fire("Erro ao cadastrar turma!");
      });
  };

  const atualizarTurma = () => {
    let arrDados = dados;
    arrDados.id_curso = parseInt(dados.id_curso);
    api
      .put("/turmas", arrDados)
      .then((response) => {
        setModdal(false);
        setDados({});
        getTurmas();
        Swal.fire("Atualizado com sucesso!");
      })
      .catch((error) => {
        Swal.fire("Erro ao atualizar turma!");
      });
  };

  const deleteTurma = (id) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Essa ação não poderá ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete("/turmas", {
            params: {
              id_turma: id,
            },
          })
          .then((response) => {
            if (response.status == 201)
              Swal.fire("Turma Deletada com Sucesso!");
            getTurmas();
          })
          .catch((error) => {
            Swal.fire("Não é possível excluir uma turma já concluída!");
            console.error("Erro ao deletar turma! " + error);
          });
      }
    });
  };

  const turmasFiltradas = useMemo(() => {
    return turmas.filter((t) => {
      const matchTexto =
        !filtroStatus ||
        t.status?.toLowerCase().includes(filtroStatus.toLowerCase());

      const matchStatus = !filtroStatus || t.status === filtroStatus;

      return matchStatus;
    });
  }, [turmas, filtroStatus]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-red-500">Turmas</h1>
      <div className="flex flex-row justify-between">
        <button
          onClick={() => setModdal(!moddal)}
          className="flex flex-row bg-green-600 text-white p-2 my-2 rounded-md cursor-pointer font-bold hover:bg-green-500"
        >
          Cadastrar Turmas
        </button>

        <select
          className="w-full border border-gray-300 rounded-lg max-w-60 p-2 my-2 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          onChange={(e) => setFiltroStatus(e.target.value)}
        >
          <option value="Aberto">Abertos</option>
          <option value="">Todos</option>
          <option value="Consolidada">Em andamento/Consolidada</option>
          <option value="Concluido">Concluído</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>

      <table className="hidden md:table w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600">
              Curso
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600">
              Status
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600">
              Início
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600">
              Fim
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600">
              Local
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600">
              Horário
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600 text-right">
              Ações
            </th>
          </tr>
        </thead>

        <tbody>
          {turmasFiltradas.map((t) => (
            <tr
              key={t.id_turma}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 font-medium text-gray-900">
                {t.titulo.toUpperCase()}
              </td>
              <td
                className={`px-6 py-4  ${statusColor[t.status.toLowerCase()]} `}
              >
                {t.status.toUpperCase()}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {moment(t.dt_inicio).format("DD/MM/YYYY")}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {moment(t.dt_fim).format("DD/MM/YYYY")}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {t.local.toUpperCase()}
              </td>
              <td className="px-6 py-4 text-gray-600">{t.horario}</td>
              <td className="px-6 py-4 text-right space-x-3">
                <button
                  title="Gerir Turma"
                  onClick={() =>
                    router.push(
                      `/sistema/gerenciarTurma?id_turma=${t.id_turma}`,
                    )
                  }
                  className="text-sm text-orange-500 hover:text-orange-400 font-medium cursor-pointer"
                >
                  <Settings />
                </button>

                <button
                  onClick={() => {
                    setDados(t);
                    setModdal(true);
                  }}
                  className="text-sm text-blue-500 hover:text-blue-400 font-medium cursor-pointer"
                >
                  <Edit />
                </button>

                <button
                  onClick={() => deleteTurma(t.id_turma)}
                  className="text-sm text-red-500 hover:text-red-400 font-medium cursor-pointer"
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {turmasFiltradas.map((t) => (
        <div
          key={t.id_turma}
          className="md:hidden flex flex-row justify-between border p-4 rounded-lg mb-4"
        >
          <div className="text-gray-500">
            <h2 className="text-xl font-bold">{t.titulo}</h2>
            <p>
              <span className="font-bold">Status:</span> {t.status}
            </p>
            <p>
              <span className="font-bold">Data Início:</span>{" "}
              {moment(t.dt_inicio).format("DD/MM/YYYY")}
            </p>
            <p>
              <span className="font-bold">Data Fim:</span>{" "}
              {moment(t.dt_fim).format("DD/MM/YYYY")}
            </p>
            <p>
              <span className="font-bold">Local:</span> {t.local}
            </p>
            <p>
              <span className="font-bold">Horário:</span> {t.horario}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <button
              onClick={() =>
                router.push(`/sistema/gerenciarTurma?id_turma=${t.id_turma}`)
              }
              title="Gerir Turma"
              className="text-sm text-orange-500 hover:text-orange-400 font-medium cursor-pointer"
            >
              <Settings />
            </button>

            <button
              onClick={() => {
                setDados(t);
                setModdal(true);
              }}
              className="text-sm text-blue-500 hover:text-blue-400 font-medium cursor-pointer"
            >
              <Edit />
            </button>

            <button
              onClick={() => deleteTurma(t.id_turma)}
              className="text-sm text-red-500 hover:text-red-400 font-medium cursor-pointer"
            >
              <Trash2 />
            </button>
          </div>
        </div>
      ))}

      {moddal && (
        <div
          onClick={() => {
            setDados({});
            setModdal(!moddal);
          }}
          className="fixed inset-0 w-full flex bg-black/70 items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-7xl mx-auto bg-white p-5"
          >
            <form className="flex flex-col w-full">
              <div className="grid grid-cols-1">
                <div className="mb-5">
                  <label className="block mb-2.5 text-sm font-medium text-heading">
                    Curso
                  </label>
                  <select
                    id="id_curso"
                    name="id_curso"
                    value={dados.id_curso || ""}
                    onChange={(e) => updateField(e)}
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  >
                    <option value="">-- Escolha --</option>
                    {cursos.map((c) => (
                      <option key={c.id_curso} value={c.id_curso}>
                        {c.titulo}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-5">
                  <label className="block mb-2.5 text-sm font-medium text-heading">
                    Data Início
                  </label>
                  <input
                    type="date"
                    name="dt_inicio"
                    value={dados.dt_inicio ? dados.dt_inicio.split("T")[0] : ""}
                    onChange={(e) => updateField(e)}
                    className="
                      w-full
                      border border-gray-500
                      rounded-lg
                      px-3 py-1.5
                      bg-white
                      text-gray-900
                      transition"
                  />
                </div>

                <div className="mb-5">
                  <label className="block mb-2.5 text-sm font-medium text-heading">
                    Data Fim
                  </label>
                  <input
                    type="date"
                    name="dt_fim"
                    value={dados.dt_fim ? dados.dt_fim.split("T")[0] : ""}
                    onChange={(e) => updateField(e)}
                    className="
                      w-full
                      border border-gray-500
                      rounded-lg
                      px-3 py-1.5
                      bg-white
                      text-gray-900
                      transition"
                  />
                </div>

                <div className="mb-5">
                  <label className="block mb-2.5 text-sm font-medium text-heading">
                    Local
                  </label>
                  <input
                    type="text"
                    name="local"
                    value={dados.local || ""}
                    placeholder="Ex: 2º GBM"
                    onChange={(e) => updateField(e)}
                    className="
                      w-full
                      border border-gray-500
                      rounded-lg
                      px-3 py-1.5
                      bg-white
                      text-gray-900
                      transition"
                  />
                </div>

                <div className="mb-5">
                  <label className="block mb-2.5 text-sm font-medium text-heading">
                    Horário
                  </label>
                  <input
                    type="text"
                    name="horario"
                    placeholder="HH:mm"
                    value={dados.horario || ""}
                    onChange={handleChangeHour}
                    className="
                      w-full
                      border border-gray-500
                      rounded-lg
                      px-3 py-1.5
                      bg-white
                      text-gray-900
                      transition"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-3">
                <button
                  onClick={salvarTurma}
                  className="text-sm bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-md font-bold cursor-pointer min-w-24"
                >
                  Salvar
                </button>
                <button
                  onClick={() => {
                    setDados({});
                    setModdal(!moddal);
                  }}
                  className="text-sm bg-red-500 hover:bg-red-400 text-white p-2 rounded-md font-bold cursor-pointer min-w-24"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
