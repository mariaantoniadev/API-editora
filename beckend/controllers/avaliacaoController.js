import { sequelize } from '../database/conecta.js'
import { Avaliacao } from '../models/Avaliacao.js';
import { Cliente } from '../models/Cliente.js';
import { Livro } from '../models/Livro.js';

export const avaliacaoIndex = async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.findAll({
      include: Cliente
    });
    res.status(200).json(avaliacoes)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const avaliacaoLivro = async (req, res) => {
  const { id } = req.params
  try {
    const avaliacoes = await Avaliacao.findAll({
      where: { livro_id: id },
      include: Cliente
    });
    res.status(200).json(avaliacoes)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const avaliacaoCreate = async (req, res) => {
  const { livro_id, cliente_id, comentario, estrelas } = req.body

  // se não informou estes atributos
  if (!livro_id || !cliente_id || !comentario || !estrelas) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
    return
  }

  const t = await sequelize.transaction();

  try {

    const avaliacao = await Avaliacao.create({
      livro_id, cliente_id, comentario, estrelas, data: new Date()
    }, { transaction: t });

    await Livro.increment('total',
      { by: estrelas, where: { id: livro_id }, transaction: t }
    );

    await Livro.increment('num',
      { by: 1, where: { id: livro_id }, transaction: t }
    );

    await t.commit();
    res.status(201).json(avaliacao)

  } catch (error) {

    await t.rollback();
    res.status(400).json({ "id": 0, "Erro": error })

  }
}

export const avaliacaoDestroy = async (req, res) => {
  const { id } = req.params

  const t = await sequelize.transaction();

  try {

    const avaliacao = await Avaliacao.findByPk(id)

    await Livro.decrement('total',
      {
        by: avaliacao.estrelas,
        where: { id: avaliacao.livro_id },
        transaction: t
      }
    );

    await Livro.decrement('num',
      {
        by: 1,
        where: { id: avaliacao.livro_id },
        transaction: t
      }
    );

    await Avaliacao.destroy({
      where: { id }
    });

    await t.commit();
    res.status(200).json({ msg: "Ok! Avaliação Excluída com Sucesso" })

  } catch (error) {

    await t.rollback();
    res.status(400).json({ "id": 0, "Erro": error })

  }
}
