"use client";

import { useState, useEffect } from "react"
import { Edit, Trash2 } from "lucide-react"
import Swal from "sweetalert2"
import api from "@/utils/Api"
import Loading from "@/components/Loading";

export default function Cursos() {
  const [moddal, setModdal] = useState(false);
  const [dados, setDados] = useState({})
  const [cursos, setCursos] = useState([])
  const [filtroTexto, setFiltroTexto] = useState("");
  const [loading, setLoading] = useState(false);
  const post_grad = {
    1: "SD",
    2: "CB",
    3: "3º SGT"
  }

  const getCursos = () => {
    setLoading(true)
    api.get("/cursos").then((response) => {
      setCursos(response.data)
    }).catch((error) => {
      alert("Erro ao buscar cursos!")
    })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getCursos()
  }, [])

  const updateField = e => {
    const fieldName = e.target.name

    setDados(existingValues => ({
      ...existingValues,
      [fieldName]: e.target.value,
    }))
  }

  const editarCurso = (curso) => {
    setDados(curso)
    setModdal(true)
  }

  const salvarCurso = (e) => {
    e.preventDefault();

    if (dados.id_curso) {
      atualizarCurso()
      return
    }

    inserirCurso()
  }

  const inserirCurso = () => {
    let arrDados = dados;
    arrDados.post_grad_minimo = parseInt(dados.post_grad_minimo)
    arrDados.carga_horaria = parseInt(dados.carga_horaria)

    api.post("/cursos", arrDados).then((response) => {
      setModdal(false)
      getCursos()
      Swal.fire("Cadastrado com sucesso!")
    }).catch((error) => {
      alert("Erro ao cadastrar curso!")
    })
  }

  const atualizarCurso = () => {
    let arrDados = dados;
    arrDados.post_grad_minimo = parseInt(dados.post_grad_minimo)
    arrDados.carga_horaria = parseInt(dados.carga_horaria)

    api.put("/cursos", arrDados).then((response) => {
      setModdal(false)
      getCursos()
      Swal.fire("Atualizado com sucesso!")
    }).catch((error) => {
      alert("Erro ao cadastrar curso!")
      console.error(error)
    })
  }

  const deleteCurso = (id) => {
    Swal.fire({
      title: "Deseja realmente excluir?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sim, excluir!"
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/cursos`, {
          params: {
            id_curso: id
          }
        }).then((response) => {
          getCursos()
          Swal.fire("Curso excluído com sucesso!")
        }).catch((error) => {
          alert("Erro ao excluir curso!")
          console.error(error)
        })
      }
    });
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-red-500">Cursos</h1>
      <button
        onClick={() => { setDados({}); setModdal(!moddal) }}
        className="bg-green-600 text-white p-2 my-2 rounded-md cursor-pointer font-bold hover:bg-green-500">Cadastrar Curso</button>

      <table className="hidden md:table w-full text-left border-collapse">

        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600">
              Titulo
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600">
              Descricao
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600">
              Carga horária
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600">
              Posto/Graduação mínimo
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-600 text-right">
              Ações
            </th>
          </tr>
        </thead>

        <tbody>
          {cursos.length === 0 ? (<div className="flex w-full pt-10 items-center justify-center text-gray-900 "><h1>Nenhum Curso Encontrado</h1></div>) :

            cursos.map((c) => (
              <tr
                key={c.id_curso}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {c.titulo.toUpperCase() || ""}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {c?.descricao?.length > 20 ? c?.descricao?.slice(0, 20)?.toUpperCase() + "..." : c?.descricao?.toUpperCase()}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {c.carga_horaria || ""}HS
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {post_grad[c.post_grad_minimo] || ""}
                </td>
                <td className="px-6 py-4 text-right space-x-3">

                  <button onClick={() => editarCurso(c)} className="text-sm text-blue-500 hover:text-blue-400 font-medium cursor-pointer">
                    <Edit />
                  </button>

                  <button
                    onClick={() => deleteCurso(c.id_curso)}
                    className="text-sm text-red-500 hover:text-red-400 font-medium cursor-pointer">
                    <Trash2 />
                  </button>

                </td>
              </tr>
            ))}
        </tbody>

      </table>

      {cursos.length === 0 ? (<div className="md:hidden flex w-full pt-10 items-center justify-center text-gray-900 "><h1>Nenhum Curso Encontrado</h1></div>) :
        cursos.map((c) => (
          <div key={c.id_curso} className="md:hidden flex flex-row justify-between border p-4 rounded-lg mb-4">
            <div className="text-gray-500">
              <h2 className="text-xl font-bold">{c.titulo.toUpperCase() || ""}</h2>
              <p><span className="font-bold">DESCRIÇÃO:</span> {c?.descricao?.length > 20 ? c?.descricao?.slice(0, 20)?.toUpperCase() + "..." : c?.descricao?.toUpperCase()} </p>
              <p><span className="font-bold">CARGA HORÁRIA:</span> {c.carga_horaria || ""}HS</p>
              <p><span className="font-bold">POST/GRAD MÍNIMO:</span> {c.post_grad_minimo || ""}</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
              <button onClick={() => editarCurso(c)} className="text-sm text-blue-500 hover:text-blue-400 font-medium cursor-pointer">
                <Edit />
              </button>

              <button
                onClick={() => deleteCurso(c.id_curso)}
                className="text-sm text-red-500 hover:text-red-400 font-medium cursor-pointer">
                <Trash2 />
              </button>

            </div>
          </div>

        ))}

      {moddal && (
        <div onClick={() => setModdal(!moddal)} className="absolute inset-0 flex bg-black/70 items-center justify-center">
          <div onClick={(e) => e.stopPropagation()} className="flex w-full md:max-w-[70%] mx-auto bg-white p-5">
            <form className="flex flex-col w-full">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-5">
                <div className="mb-2">
                  <label className="block mb-2.5 text-sm font-medium text-heading">Título</label>
                  <input
                    type="text"
                    name="titulo"
                    id="titulo"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    placeholder="ABT Pierce"
                    value={dados?.titulo?.toUpperCase() || ""}
                    onChange={(e) => updateField(e)}
                    required />
                </div>

                <div className="mb-2">
                  <label className="block mb-2.5 text-sm font-medium text-heading">Descrição</label>
                  <textarea
                    type="text"
                    name="descricao"
                    id="descricao"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    placeholder="ABT Pierce"
                    onChange={(e) => updateField(e)}
                    value={dados?.descricao?.toUpperCase() || ""}
                    required />
                </div>

                <div className="mb-2">
                  <label className="block mb-2.5 text-sm font-medium text-heading">Carga horária (em horas)</label>
                  <input
                    type="number"
                    name="carga_horaria"
                    id="carga_horaria"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    placeholder="4"
                    value={dados.carga_horaria || ""}
                    onChange={(e) => updateField(e)}
                    required />
                </div>

                <div className="mb-2">
                  <label className="block mb-2.5 text-sm font-medium text-heading">Post/Grad Mínima</label>
                  <select
                    id="post_grad_minimo"
                    name="post_grad_minimo"
                    value={dados.post_grad_minimo}
                    onChange={(e) => updateField(e)}
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  >
                    <option value="">-- Escolha --</option>
                    <option value={1}>SD</option>
                    <option value={2}>CB</option>
                    <option value={3}>3º SGT</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-row gap-3">
                <button className="text-sm bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-md font-bold cursor-pointer min-w-24" onClick={salvarCurso}>Salvar</button>
                <button onClick={() => setModdal(!moddal)} className="text-sm bg-red-500 hover:bg-red-400 text-white p-2 rounded-md font-bold cursor-pointer min-w-24">Cancelar</button>
              </div>
            </form>

          </div>
        </div >
      )}

    </div >
  );
}

