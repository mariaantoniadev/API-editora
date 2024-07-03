"use client";
import Link from "next/link";
import { useContext } from "react";
import { RiUserShared2Line } from "react-icons/ri";
import { RxExit } from "react-icons/rx";
import { ClienteContext } from "../context/ClienteContext";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';
import { navigate } from './actions';

function Titulo() {
  const { idClienteLogado, nomeClienteLogado, mudaLogin } = useContext(ClienteContext);
  const router = useRouter();

  function logout() {
    Swal.fire({
      title: "Confirma saída do sistema?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        mudaLogin({ id: null, nome: "" });
      }
    });
  }

  const scrollToSection = () => {
    const section = document.getElementById('livros');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav style={{ backgroundColor: "#0A0A0A", borderColor: "#0A0A0A" }} className="border-blue-300 py-1.5 bg-blue-200 dark:bg-blue-900 dark:border-blue-100">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4">
        <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          <img src="./logoescrito.png" className="w-28" alt="Editora Logo" />
        </Link>
        <div className="flex items-center space-x-4">
          <form className="flex-1" action={navigate}>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Pesquisa</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" name="pesq" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-black rounded-lg bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Informe título ou gênero do livro" required />
              <button type="submit" className="text-blue-700 absolute end-2.5 bottom-2.5 border border-blue-700 hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:border-blue-600 dark:text-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pesquisar</button>
            </div>
          </form>
          <button
            onClick={scrollToSection}
            type="button"
            className="ml-4 mt-1.5 focus:outline-none text-purple-700 border border-purple-700 hover:bg-purple-100 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:border-purple-600 dark:text-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
            Lançamentos
          </button>
        </div>
        <div className="flex items-center space-x-2">
          {idClienteLogado ? (
            <div className="flex items-center space-x-2">
              <span>{nomeClienteLogado}</span>
              <span onClick={logout} style={{ cursor: "pointer" }}>
                <RxExit className="inline" title="Sair" />
              </span>
            </div>
          ) : (
            <Link
              href="/login"
              className="block py-2 px-4 focus:outline-none text-black bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              aria-current="page"
              style={{ backgroundColor: "#FDB96A" }}
            >
              <RiUserShared2Line className="inline" /> Entrar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Titulo;
