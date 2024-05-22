import { Router } from "express"
import { livroCreate, livroDelete, livroIndex, livroPesquisa, livroShow, livroUpdate } from "./controllers/livroController.js"
import { clienteCreate, clienteIndex } from "./controllers/clienteController.js"
import { loginCliente } from "./controllers/loginController.js"
import { avaliacaoCreate, avaliacaoDestroy, avaliacaoLivro, avaliacaoIndex } from "./controllers/avaliacaoController.js"

const router = Router()

router.get("/livros", livroIndex)
      .post("/livros", livroCreate)
      .put("/livros/:id", livroUpdate)
      .delete("/livros/:id", livroDelete)
      .get("/livros/:id", livroShow)
      .get("/livros/pesquisa/:palavra", livroPesquisa)

router.get("/clientes", clienteIndex)
      .post("/clientes", clienteCreate)
      
router.post("/login", loginCliente)

router.get('/avaliacoes', avaliacaoIndex)
      .post('/avaliacoes', avaliacaoCreate)
      .delete('/avaliacoes/:id', avaliacaoDestroy)
      .get('/avaliacoes/livro/:id', avaliacaoLivro)

export default router