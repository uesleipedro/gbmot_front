import "./globals.css";

export const metadata = {
  title: "GBMOT",
  description: "Sistema base",
};

export default function RootLayout({ children }) {

  return (
    <html lang="pt-BR">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}

