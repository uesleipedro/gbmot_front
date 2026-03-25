"use client";

export default function ListaChamada() {
  const alunos = [
    { id: 1, nome: "João Silva" },
    { id: 2, nome: "Maria Souza" },
    { id: 3, nome: "Carlos Mendes" },
    { id: 4, nome: "Ana Paula" },
  ];

  function imprimir() {
    window.print();
  }

  return (
    <div className="p-6">

      {/* BOTÃO - NÃO APARECE NA IMPRESSÃO */}
      <div className="mb-6 print:hidden">
        <button
          onClick={imprimir}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Imprimir Lista
        </button>
      </div>

      {/* ÁREA DE IMPRESSÃO */}
      <div className="area-impressao bg-white p-8">

        <div className="text-center mb-8">
          <h1 className="text-xl font-bold uppercase">
            Lista de Chamada
          </h1>

          <div className="mt-4 text-sm flex justify-between">
            <span>Curso: __________________________</span>
            <span>Data: ____ / ____ / ______</span>
          </div>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-black p-2 w-12">Nº</th>
              <th className="border border-black p-2 text-left">Nome</th>
              <th className="border border-black p-2 w-32 text-center">
                Presença
              </th>
              <th className="border border-black p-2 w-40 text-center">
                Assinatura
              </th>
            </tr>
          </thead>

          <tbody>
            {alunos.map((aluno, index) => (
              <tr key={aluno.id}>
                <td className="border border-black p-2">
                  {index + 1}
                </td>
                <td className="border border-black p-2">
                  {aluno.nome}
                </td>
                <td className="border border-black p-2 text-center">
                  ☐
                </td>
                <td className="border border-black p-6"></td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

