import ItemLivro from "./components/ItemLivro";
import Pesquisa from "./components/Pesquisa";
import "./globals.css";

async function getLivros() {
  const response = await fetch("http://localhost:3004/livros", {
    cache: "no-store",
  });
  const dados = await response.json();
  return dados;
}

export interface livroProps {
  id: number;
  titulo: string;
  genero: string;
  autor: string;
  preco: number;
  foto: string;
  num: number;
  total: number;
  sinopse: string;
}

export default async function Home() {
  const livros = await getLivros();

  const listaLivros = livros.map((livro: livroProps) => (
    <ItemLivro key={livro.id} livro={livro} />
  ));

  return (
    <div className="max-w-7xl mx-auto">
      <Pesquisa />
      <div className="pt-10 grid grid-cols-2">
        <div className="mt-20 ps-11">
          <h1 className="mt-11 mb-4 pt-11 ps-20 text-2xl font-bold leading-none tracking-tight text-gray-900 lg:text-3xl dark:text-white">
            Encontre o que procura na Indie!
          </h1>
        </div>
        <div className="ps-40">
          <img src="/gatoloco.png" className="h-96" alt="Gato" />
        </div>
      </div>
      <h1 className="mt-5 mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 lg:text-3xl dark:text-white">
        Editora Indie:{" "}
        <span className="underline underline-offset-3 decoration-8 decoration-purple-400 dark:decoration-purple-600">
          O lugar que você procura!
        </span>
      </h1>
      <h1 id="livros" className="mt-5 mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 lg:text-3xl dark:text-white">
        Confira nossos livros:
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {listaLivros}
      </div>
    </div>
  );
}
