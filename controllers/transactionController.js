const { Transaction: TransactionModel } = require("../models/Transaction")

const transactionController = {
  
  create: async(req, res) => {
    const { id } = req.user
    try {
      const transaction = {
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        value: req.body.value,
        month: req.body.month,
        method_payment: req.body.method_payment,
        attached: req.body.attached,
        id: id
      }

      const response = await TransactionModel.create(transaction)

      res.status(201).json({ response, msg: "Fin criado com sucesso!" })

    } catch(e) {
      console.log(e);
    }
  },

  getAll: async (req, res) => {
    try {
      const { id } = req.user;
      const page = parseInt(req.query.page) || 1; // Página atual (padrão: 1 se não for fornecida)
      const perPage = parseInt(req.query.perPage) || 10; // Número de resultados por página (padrão: 10 se não for fornecida)
      const transactionsCount = await TransactionModel.countDocuments({ id });
      // Calcula o índice do primeiro resultado da página atual
      const startIndex = (page - 1) * perPage;

      const transactions = await TransactionModel.find({ id })
        .skip(startIndex) // Pula os resultados anteriores à página atual
        .limit(perPage); // Limita o número de resultados na página


      console.log({
        transactions,
        totalCount: transactionsCount
      })
      res.json({
        transactions,
        totalCount: transactionsCount
      })

    } catch(e) {
      console.log(e);
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const transactions = await TransactionModel.findById(id);

      if (!transactions) {
        res.status(404).json({ msg: "Fin não encontrado." })
        return
      }
      res.json(transactions)

    } catch(e) {
      console.log(e);
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const transactions = await TransactionModel.findById(id);

      if (!transactions) {
        res.status(404).json({ msg: "Fin não encontrado." })
        return
      }
      
      const deleteService = await TransactionModel.findByIdAndDelete(id)

      res.status(200).json({deleteService, msg: "Fin excluido com sucesso!"})

    } catch(e) {
      console.log(e);
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;

      const transaction = {
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        value: req.body.value,
        month: req.body.month,
        method_payment: req.body.method_payment,
        attached: req.bosy.attached
      }

      const updatetransaction = await TransactionModel.findByIdAndUpdate(id, transaction)

      if(!updatetransaction) {
        res.status(404).json({ msg: "Fin não encontrado." })
        return
      }

      res.status(200).json({transaction, msg: "Serviço atualizado com sucesso!"})

    } catch (e) {

    }

  }

}

module.exports = transactionController