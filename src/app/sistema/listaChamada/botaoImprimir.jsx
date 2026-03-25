"use client";

export function BotaoImprimir() {
  return (
    <button
      onClick={() => {
        setTimeout(() => {
          window.print();
        }, 100);
        window.print()
      }}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 print:hidden"
    >
      Imprimir
    </button>
  );
}
