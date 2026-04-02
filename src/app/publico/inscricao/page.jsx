"use client";

import { useState, useEffect } from "react";
import api from "@/utils/Api";
import moment from "moment";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';
import { Suspense } from "react";

export default function InscricaoPage() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const idTurmaParam = searchParams.get('id_turma');
  const idTurma = idTurmaParam ? Number(idTurmaParam) : null;
  const post_grad = [
    { numero: 1, descricao: "Soldado", abreviacao: "Sd" },
    { numero: 2, descricao: "Cabo", abreviacao: "Cb" },
    { numero: 3, descricao: "Terceiro-Sargento", abreviacao: "3º Sgt" },
    { numero: 4, descricao: "Segundo-Sargento", abreviacao: "2º Sgt" },
    { numero: 5, descricao: "Primeiro-Sargento", abreviacao: "1º Sgt" },
    { numero: 6, descricao: "Subtenente", abreviacao: "Subten" },
    { numero: 7, descricao: "Aspirante-a-Oficial", abreviacao: "Asp Of" },
    { numero: 8, descricao: "Segundo-Tenente", abreviacao: "2º Ten" },
    { numero: 9, descricao: "Primeiro-Tenente", abreviacao: "1º Ten" },
    { numero: 10, descricao: "Capitão", abreviacao: "Cap" },
    { numero: 11, descricao: "Major", abreviacao: "Maj" },
    { numero: 12, descricao: "Tenente-Coronel", abreviacao: "Ten Cel" },
    { numero: 13, descricao: "Coronel", abreviacao: "Cel" }
  ]
  const unidadesCBMDF = [
    { id: 1, sigla: "GPCIV", nome: "Grupamento de Proteção Civil", tipo: "Especializado", ordem: 1 },
    { id: 2, sigla: "GPRAM", nome: "Grupamento de Busca e Salvamento com Cães", tipo: "Especializado", ordem: 2 },
    { id: 3, sigla: "GPCIU", nome: "Grupamento de Prevenção e Combate a Incêndio Urbano", tipo: "Especializado", ordem: 3 },
    { id: 4, sigla: "GBS", nome: "Grupamento de Busca e Salvamento", tipo: "Especializado", ordem: 4 },
    { id: 5, sigla: "GAEPH", nome: "Grupamento de Atendimento Pré-Hospitalar", tipo: "Especializado", ordem: 5 },
    { id: 6, sigla: "GAVOP", nome: "Grupamento de Aviação Operacional", tipo: "Especializado", ordem: 6 },
    { id: 7, sigla: "GBMOT", nome: "Grupamento de Motociclistas Operacionais", tipo: "Especializado", ordem: 7 },

    { id: 8, sigla: "1º ESAV", nome: "1º Esquadrão de Aviação", tipo: "Aviação", ordem: 8 },
    { id: 9, sigla: "2º ESAV", nome: "2º Esquadrão de Aviação", tipo: "Aviação", ordem: 9 },

    { id: 10, sigla: "1º GBM", nome: "1º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 10 },
    { id: 11, sigla: "2º GBM", nome: "2º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 11 },
    { id: 12, sigla: "3º GBM", nome: "3º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 12 },
    { id: 13, sigla: "4º GBM", nome: "4º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 13 },
    { id: 14, sigla: "6º GBM", nome: "6º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 14 },
    { id: 15, sigla: "7º GBM", nome: "7º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 15 },
    { id: 16, sigla: "8º GBM", nome: "8º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 16 },
    { id: 17, sigla: "9º GBM", nome: "9º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 17 },
    { id: 18, sigla: "10º GBM", nome: "10º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 18 },
    { id: 19, sigla: "11º GBM", nome: "11º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 19 },
    { id: 20, sigla: "12º GBM", nome: "12º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 20 },
    { id: 21, sigla: "13º GBM", nome: "13º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 21 },
    { id: 22, sigla: "15º GBM", nome: "15º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 22 },
    { id: 23, sigla: "16º GBM", nome: "16º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 23 },
    { id: 24, sigla: "17º GBM", nome: "17º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 24 },
    { id: 25, sigla: "18º GBM", nome: "18º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 25 },
    { id: 26, sigla: "19º GBM", nome: "19º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 26 },
    { id: 27, sigla: "21º GBM", nome: "21º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 27 },
    { id: 28, sigla: "22º GBM", nome: "22º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 28 },
    { id: 29, sigla: "25º GBM", nome: "25º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 29 },
    { id: 30, sigla: "34º GBM", nome: "34º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 30 },
    { id: 31, sigla: "36º GBM", nome: "36º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 31 },
    { id: 32, sigla: "37º GBM", nome: "37º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 32 },
    { id: 33, sigla: "37º GBM / SIERRA", nome: "37º GBM - Unidade Sierra", tipo: "GBM", ordem: 33 },
    { id: 34, sigla: "41º GBM", nome: "41º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 34 },
    { id: 35, sigla: "45º GBM", nome: "45º Grupamento de Bombeiro Militar", tipo: "GBM", ordem: 35 }
  ]
  const [turmas, setTurmas] = useState([])

  const [form, setForm] = useState({});

  useEffect(() => {
    if (!idTurma) return;
    if (!turmas.length) return;

    const turmaSelecionada = turmas.find(
      (t) => Number(t.id_turma) === idTurma
    );

    if (!turmaSelecionada) {
      console.warn("Turma não encontrada", idTurma);
      return;
    }

    setForm((prev) => ({
      ...prev,
      id_turma: turmaSelecionada.id_turma,
      id_curso: turmaSelecionada.id_curso,
    }));
  }, [idTurma, turmas]);

  const getTurmas = () => {
    api.get("/turmas").then((response) => {
      setTurmas(response.data)
      console.log("turmas", response.data)
    }).catch((error) => {
      console.error("Erro ao buscar turmas!")
    })
  }

  useEffect(() => {
    getTurmas()
  }, [])

  useEffect(() => {
    console.log(form)
  }, [form])

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!form.matricula || form.matricula.length !== 7) return;

      try {
        const response = await api.get(`/alunos/matricula/${form.matricula}`);
        const aluno = response.data?.[0];
        if (!aluno) return;

        setForm((prev) => ({
          ...prev,
          nome: aluno.nome,
          nome_guerra: aluno.nome_guerra,
          post_grad: aluno.post_grad,
          whatsapp: aluno.whatsapp,
          lotacao: aluno.lotacao,
          qbmg: aluno.qbmg,
        }));

      } catch (error) {
        console.error(error);
      }
    }, 400); // espera o usuário parar de digitar

    return () => clearTimeout(timeout);
  }, [form.matricula]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const handleChangeTurma = (e) => {
    const idTurma = e.target.value;

    const turmaSelecionada = turmas.find(
      (t) => String(t.id_turma) === String(idTurma)
    );

    setForm((prev) => ({
      ...prev,
      id_turma: turmaSelecionada.id_turma,
      id_curso: turmaSelecionada.id_curso,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registrarInscricao();
  }

  const registrarInscricao = async () => {
    await api.post("/inscricao", form).then((response) => {
      Swal.fire("Inscrição realizada com sucesso!")
    }).catch((error) => {
      console.log(error?.response)
      Swal.fire(error?.response?.data?.error || "Erro ao realizar inscrição!")
    })

    setForm({})
    router.push("/publico/listaTurmas")
  }

  return (
    <Suspense>
      <div className="flex w-full h-full justify-center items-center bg-gray-50">
        <div className="flex flex-col items-center p-4 mt-4 w-full max-w-xl mx-auto bg-white shadow-md border-gray-200 rouded-xl" >

          <h1 className="text-2xl font-bold text-center mb-6">
            Inscrição em Curso
          </h1>

          <form onSubmit={handleSubmit} className="w-full space-y-5">
            {/* Matrícula */}
            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Matrícula
              </label>
              <input
                type="text"
                name="matricula"
                value={form.matricula || ""}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              />
            </div>

            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                name="nome"
                value={form.nome || ""}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              />
            </div>

            {/* Nome de Guerra */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome de Guerra
              </label>
              <input
                type="text"
                name="nome_guerra"
                value={form.nome_guerra || ""}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              />
            </div>

            {/** Posto/Graduação */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Posto/Graduação
              </label>
              <select
                name="post_grad"
                value={form.post_grad || ""}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              >
                <option value="">Selecione</option>
                {post_grad.map((pg) => (
                  <option key={pg.numero} value={pg.numero}>{pg.abreviacao}</option>
                ))}
              </select>
            </div>

            {/*QBMG*/}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                QBMG
              </label>
              <select
                name="qbmg"
                value={form.qbmg ?? ""}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              >
                <option value="">Selecione</option>
                <option key={1} value={1}>QBMG-1</option>
                <option key={2} value={2}>QBMG-2</option>
                <option key={3} value={3}>QBMG-3</option>
                <option key={4} value={4}>QBMG-4</option>
                <option key={5} value={5}>OFICIAL</option>
              </select>
            </div>

            {/*Telefone*/}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Whatsapp
              </label>
              <input
                type="text"
                name="whatsapp"
                value={form.whatsapp || ""}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              />
            </div>

            {/* Select GBM */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lotação
              </label>
              <select
                name="lotacao"
                value={form.lotacao || ""}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              >
                <option value="">Selecione</option>
                {unidadesCBMDF.map((unidade) => (
                  <option key={unidade.id} value={unidade.id}>{unidade.sigla}</option>
                ))}
              </select>
            </div>

            {/* Select Curso */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Curso
              </label>
              <select
                name="id_turma"
                value={form.id_turma || ""}
                onChange={handleChangeTurma}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              >
                <option value="">Selecione</option>
                {turmas.map((t) => (
                  <option key={t.id_turma} value={t.id_turma}>
                    {t.titulo} - {moment(t.dt_inicio).format("DD/MM/YYYY")}
                  </option>
                ))}
              </select>
            </div>

            {/* Botão */}
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition cursor-pointer"
            >
              Enviar Inscrição
            </button>

          </form >
        </div >
      </div >
    </Suspense>
  );
}

