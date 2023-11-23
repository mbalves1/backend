const { Card: CardModel } = require("../models/Card")

const cardController = {
  
  create: async(req, res) => {
    const { id } = req.user
    try {
      const card = {
        name: req.body.name,
        bank: req.body.bank,
        type: req.body.type,
        flag: req.body.flag,
        expiration: req.body.expiration,
        number_card: req.body.number_card,
        code: req.body.code,
        color: req.body.color,
        id: id
      }

      const response = await CardModel.create(card)

      res.status(201).json({ response, msg: "Cartão criado com sucesso!" })

    } catch(e) {
      console.error(e);
    }
  },

  getAll: async (req, res) => {
    try {
      const { id } = req.user
      const cards = await CardModel.find({ id });

      res.json(cards)

    } catch(e) {
      console.error(e);
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const cards = await CardModel.findById(id);

      if (!cards) {
        res.status(404).json({ msg: "Cartão não encontrado." })
        return
      }
      res.json(cards)

    } catch(e) {
      console.error(e);
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const cards = await CardModel.findById(id);

      if (!cards) {
        res.status(404).json({ msg: "Cartão não encontrado." })
        return
      }
      
      const deleteService = await CardModel.findByIdAndDelete(id)

      res.status(200).json({deleteService, msg: "Cartão excluido com sucesso!"})

    } catch(e) {
      console.error(e);
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;

      const card = {
        name: req.body.name,
        bank: req.body.bank,
        type: req.body.type,
        flag: req.body.flag,
        expiration: req.body.expiration,
        number_card: req.body.number_card,
        code: req.body.code,
        color: req.body.color
      }

      const updateCard = await CardModel.findByIdAndUpdate(id, card)

      if(!updateCard) {
        res.status(404).json({ msg: "Cartão não encontrado." })
        return
      }

      return res.status(200).json({msg: "Cartão atualizado com sucesso!"})
      
    } catch (e) {
      console.error(e)
      res.status(500).json({ msg: "Erro ao atualizar cartão." });
    }

  }

}

module.exports = cardController