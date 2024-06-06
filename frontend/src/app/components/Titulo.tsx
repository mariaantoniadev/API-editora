"use client";
import Link from "next/link";
import { useContext } from "react";
import { RiUserShared2Line } from "react-icons/ri";
import { RxExit } from "react-icons/rx";
import { ClienteContext } from "../context/ClienteContext";
import Swal from "sweetalert2";

function Titulo() {
  const { idClienteLogado, nomeClienteLogado, mudaLogin } =
    useContext(ClienteContext);

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

  return (
    <nav
      style={{ backgroundColor: "#111215", borderColor: "#111215" }}
      className="border-blue-300 py-2 bg-blue-200 dark:bg-blue-900 dark:border-blue-100"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="./logo.png" className="h-16" alt="Editora Logo" />
          <img src="./logoescrito.png" className="h-16" alt="Editora Logo" />
        </Link>
        <button
          data-collapse-toggle="navbar-solid-bg"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-orange-500 rounded-lg md:hidden hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:text-orange-400 dark:hover:bg-orange-700 dark:focus:ring-orange-600"
          aria-controls="navbar-solid-bg"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-orange-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-orange-800 md:dark:bg-transparent dark:border-orange-700">
            <li className="text-white">
              {idClienteLogado ? (
                <div>
                  {nomeClienteLogado} -
                  <span onClick={logout} style={{ cursor: "pointer" }}>
                    {" "}
                    <RxExit className="inline" title="Sair" />
                  </span>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="block py-4 px-4 md:py-4 md:px-4 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 min-w-[90px] min-h-[50px]"
                  aria-current="page"
                >
                  <RiUserShared2Line className="inline" /> Entrar
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Titulo;
