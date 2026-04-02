"use client";

import moment from "moment";
moment.locale("pt-br");

export default function FichaChamada() {
  const alunos = JSON.parse(sessionStorage.getItem("alunos"));

  const handlePrint = () => {
    setTimeout(() => window.print(), 100);
  };

  return (
    <div className="p-6 text-black">
      <button
        onClick={handlePrint}
        className="print:hidden bg-blue-500 text-white px-4 py-2 rounded"
      >
        Imprimir
      </button>

      <div className="print-area" id="print-area" name="print-area">
        {/* Cabeçalho */}
        <div className="text-center text-sm leading-tight">
          <p className="font-semibold">
            CORPO DE BOMBEIROS MILITAR DO DISTRITO FEDERAL
          </p>
          <p>COMANDO OPERACIONAL</p>
          <p>GRUPAMENTO DE BOMBEIROS MILITAR DE MOTOMECANIZAÇÃO</p>
          <p>SEÇÃO DE DOUTRINA ENSINO E INSTRUÇÃO</p>
        </div>

        {/* Título */}
        <div className="text-center mt-6 font-bold">
          RELAÇÃO DE CHAMADA - CAPACITAÇÃO – DE{" "}
          {moment(alunos[0]?.dt_inicio).format("DD [DE] MMMM").toUpperCase()} A{" "}
          {moment(alunos[0]?.dt_fim).format("DD [DE] MMMM").toUpperCase()} DE{" "}
          {moment(alunos[0]?.dt_inicio).format("YYYY")}
        </div>

        <div className="mt-2 font-semibold">{alunos[0]?.curso}</div>

        {/* Tabela */}
        <table className="w-full border border-black mt-4 text-xs">
          <thead>
            <tr>
              <th className="border p-1">ORD.</th>
              <th className="border p-1">POSTO/GRAD</th>
              <th className="border p-1">NOME COMPLETO</th>
              <th className="border p-1">NOME DE GUERRA</th>
              <th className="border p-1">MATR.</th>
              <th className="border p-1">LOTAÇÃO</th>

              <th className="border p-1" colSpan={2}>
                1º DIA
              </th>
              <th className="border p-1" colSpan={2}>
                2º DIA
              </th>
              <th className="border p-1" colSpan={2}>
                3º DIA
              </th>

              <th className="border p-1">RESULTADO</th>
            </tr>

            <tr>
              <th className="border"></th>
              <th className="border"></th>
              <th className="border"></th>
              <th className="border"></th>
              <th className="border"></th>
              <th className="border"></th>

              <th className="border">Mat</th>
              <th className="border">Ves</th>

              <th className="border">Mat</th>
              <th className="border">Ves</th>

              <th className="border">Mat</th>
              <th className="border">Ves</th>

              <th className="border"></th>
            </tr>
          </thead>

          <tbody>
            {alunos.map((aluno, index) => (
              <tr key={aluno.id}>
                <td className="border p-1 text-center">{index + 1}</td>
                <td className="border p-1 text-center">
                  {aluno?.post_grad?.toUpperCase()}
                </td>
                <td className="border p-1 text-center">
                  {aluno?.nome?.toUpperCase()}
                </td>
                <td className="border p-1 text-center">
                  {aluno?.nome_guerra?.toUpperCase()}
                </td>
                <td className="border p-1 text-center">{aluno.matricula}</td>
                <td className="border p-1 text-center">
                  {aluno?.lotacao?.toUpperCase()}
                </td>

                {/* Dias */}
                {[...Array(6)].map((_, i) => (
                  <td key={i} className="border h-6"></td>
                ))}

                <td className="border"></td>
                <td className="border"></td>
              </tr>
            ))}

            {/* Linhas vazias para impressão */}
            {Array.from({ length: 10 }).map((_, i) => (
              <tr key={`empty-${i}`}>
                <td className="border h-6"></td>
                <td className="border"></td>
                <td className="border"></td>
                <td className="border"></td>
                <td className="border"></td>
                <td className="border"></td>

                {[...Array(6)].map((_, j) => (
                  <td key={j} className="border"></td>
                ))}

                <td className="border"></td>
                <td className="border"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
