"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from '../../public/gemot.svg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Detectar scroll para efeito visual
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu mobile ao mudar de rota
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const menuItems = [
    { href: '/sistema/cursos', label: 'Cursos' },
    { href: '/sistema/turmas', label: 'Turmas' },
    { href: '/sistema/alunos', label: 'Alunos' },
  ];

  return (
    <>

      <nav className={`
        fixed w-full z-50 transition-all duration-300
        ${scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50'
          : 'bg-white border-b border-gray-200'
        }
      `}>
        <div className="flex flex-row items-center justify-between h-25 bg-red-700 p-3 gap-4">
          <div className="flex w-full justify-between items-center h-16">

            {/* Logo e Nome da Empresa */}
            <div className="flex flex-row items-center h-25 bg-red-700 p-3 gap-4">
              <div className="bg-white rounded-full p-1">
                <Image
                  src={logo}
                  alt="Logomarca"
                  width={70}
                  height={70}
                  className="basis-1/5"
                />
              </div>
              <div className="text-white">
                <h1 className="font-bold text-xl">
                  Grupamento de Bombeiro Militar de Motomecanização
                </h1>

                <p>
                  Portal de Capacitações e Treinamentos
                </p>
              </div>
            </div>

            {/* Botão Sair - Apenas Desktop */}
            <div className="hidden md:block">
              <Link
                href="/logout"
                className="
                  inline-flex items-center gap-2 px-4 py-2
                  text-sm font-medium text-white
                  group
                "
              >
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Sair</span>
              </Link>
            </div>

            {/* Botão Menu Mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center
                rounded-lg hover:bg-gray-100 transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-red-500/20"
              aria-label="Menu"
            >
              <div className="relative w-5 h-4">
                <span className={`
                  absolute left-0 block w-full h-0.5 bg-white
                  transform transition-all duration-300
                  ${isOpen ? 'top-1.5 rotate-45' : 'top-0'}
                `} />
                <span className={`
                  absolute left-0 block w-full h-0.5 bg-white top-1.5
                  transition-all duration-300
                  ${isOpen ? 'opacity-0' : 'opacity-100'}
                `} />
                <span className={`
                  absolute left-0 block w-full h-0.5 bg-white
                  transform transition-all duration-300
                  ${isOpen ? 'top-1.5 -rotate-45' : 'top-3'}
                `} />
              </div>
            </button>
          </div>
        </div>

        {/* Menu Mobile Overlay */}
        <div className={`
          fixed inset-0 top-25 bg-black/20 backdrop-blur-sm z-40
          transition-opacity duration-300 md:hidden
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `} onClick={() => setIsOpen(false)} />

        {/* Menu Mobile Drawer */}
        <div className={`
          fixed top-25 left-0 bottom-0 w-64 bg-white z-50
          transform transition-transform duration-300 ease-in-out
          border-r border-gray-200 shadow-xl md:hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex flex-col h-full">
            {/* Cabeçalho do menu mobile */}
            <div className="p-4 border-b border-gray-100">
              <p className="text-xs font-medium text-gray-400 tracking-wider uppercase">
                Menu
              </p>
            </div>

            {/* Itens do menu */}
            <nav className="flex-1 py-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 mx-2 rounded-lg
                      text-sm font-medium transition-all duration-200
                      ${isActive
                        ? 'bg-red-50 text-red-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                      relative
                    `}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-red-500 rounded-r-full" />
                    )}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Rodapé com botão Sair no mobile */}
            <div className="p-4 border-t border-gray-100">
              <Link
                href="/logout"
                className="
                  flex items-center gap-3 px-4 py-3
                  text-lg text-white font-bold
                  transition-colors duration-200
                  rounded-lg hover:bg-gray-50
                "
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-lg">Sair</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Espaçador para compensar a navbar fixa */}
      <div className="h-16" />
    </>
  );
}
