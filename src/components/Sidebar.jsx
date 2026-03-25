"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useMenu } from "@/contexts/MenuContext";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { toggleMenu } = useMenu();
  const menuItems = [
    {
      href: '/sistema/cursos',
      label: 'Cursos',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      href: '/sistema/turmas',
      label: 'Turmas',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      href: '/sistema/alunos',
      label: 'Alunos',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
  ];

  // Fechar sidebar em mobile quando mudar de rota
  useEffect(() => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  }, [pathname]);

  return (
    <div className="hidden md:block">
      {/* Overlay para mobile quando sidebar está aberta */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => { setCollapsed(true); toggleMenu() }}
        />
      )}

      <aside className={`
        fixed left-0 top-25 h-[calc(100vh-6.25rem)]
        bg-white border-r border-gray-200
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-20' : 'w-56'}
        shadow-sm
      `}>

        {/* Botão de colapsar (apenas desktop) */}
        <button
          onClick={() => { setCollapsed(!collapsed); toggleMenu() }}
          className="hidden md:flex absolute -right-3 top-6 w-6 h-6 bg-white border border-gray-200 rounded-full cursor-pointer items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
        >
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Logo da sidebar (opcional) */}
        <div className={`
          py-6 px-4 border-b border-gray-100
          transition-opacity duration-300
          ${collapsed ? 'opacity-0 h-0 py-0 overflow-hidden' : 'opacity-100'}
        `}>
          <p className="text-xs font-medium text-gray-400 tracking-wider uppercase">
            Navegação
          </p>
        </div>

        {/* Menu de navegação */}
        <nav className="py-4 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      group flex items-center gap-3 px-3 py-2.5
                      rounded-lg text-sm font-medium
                      transition-all duration-200
                      ${isActive
                        ? 'bg-red-50 text-red-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                      relative
                    `}
                  >
                    {/* Indicador de item ativo */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-red-500 rounded-r-full" />
                    )}

                    {/* Ícone */}
                    <span className={`
                      transition-colors duration-200
                      ${isActive ? 'text-red-500' : 'text-gray-400 group-hover:text-gray-600'}
                    `}>
                      {item.icon}
                    </span>

                    {/* Label */}
                    <span className={`
                      whitespace-nowrap transition-all duration-300
                      ${collapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}
                    `}>
                      {item.label}
                    </span>

                    {/* Tooltip para modo colapsado */}
                    {collapsed && (
                      <span className="
                        absolute left-full ml-2 px-2 py-1
                        bg-gray-800 text-white text-xs rounded
                        opacity-0 group-hover:opacity-100
                        pointer-events-none transition-opacity
                        whitespace-nowrap z-50
                      ">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Rodapé da sidebar */}
        <div className={`
          absolute bottom-0 left-0 right-0 p-4
          border-t border-gray-100
          transition-opacity duration-300
          ${collapsed ? 'opacity-0' : 'opacity-100'}
        `}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">Admin</p>
              <p className="text-xs text-gray-400 truncate">admin@gbmot.com</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
