export default function Loading() {
  return (
    <div className="w-full flex flex-col gap-3 animate-pulse">
      {/* Cabeçalho fake */}
      <div className="h-6 bg-gray-300 rounded w-1/3"></div>

      {/* Linhas fake */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-10 bg-gray-200 rounded"
        />
      ))}
    </div>
  );
}
