import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
export const metadata = {
  title: "GBMOT",
  description: "Sistema base",
};

export default function RootLayout({ children }) {

  return (
    <AuthProvider>
      <html lang="pt-BR">
        <body className="bg-gray-50">
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}

