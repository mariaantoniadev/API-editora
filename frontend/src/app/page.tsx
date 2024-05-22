import ItemLivro from "./components/ItemLivro";
import Pesquisa from "./components/Pesquisa";
import './globals.css';

async function getLivros() {
  const response = await fetch("http://localhost:3004/livros", 
        { cache: 'no-store' })
  const dados = await response.json()
  return dados
}

export interface livroProps {
  id: number
  titulo: string
  genero: string
  autor: string
  preco: number
  foto: string
  num: number
  total: number
  sinopse: string
}

export default async function Home() {

  const livros = await getLivros()

  const listaLivros = livros.map((livro: livroProps) => (
    <ItemLivro key={livro.id} livro={livro} />
  ))

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="mt-5 mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 lg:text-3xl dark:text-black">Editora Indie: <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-yellow-600">O lugar que você procura!</span></h1>
      <Pesquisa />
      <h1 className="mt-5 mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 lg:text-3xl dark:text-black">Confira nossos livros:</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {listaLivros}
      </div>

    </div>
  );
}
