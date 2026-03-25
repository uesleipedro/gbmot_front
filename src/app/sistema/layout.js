"use client"

import "../globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { MenuProvider } from "@/contexts/MenuContext";
import { useMenu } from "@/contexts/MenuContext";

function LayoutContent({ children }) {
  const { isOpen } = useMenu();

  return (
    <div className={`transition-all duration-300 ${isOpen ? "md:ml-56" : "md:ml-20"}`}>
      {children}
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50">
        <MenuProvider>
          <Navbar />
          <Sidebar />

          <LayoutContent>
            <main className="mt-10 p-4">
              {children}
            </main>
          </LayoutContent>

        </MenuProvider>
      </body>
    </html>
  );
}
