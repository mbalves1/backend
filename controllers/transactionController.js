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
        installment: req.body.installment,
        installment_total: req.body.installment_total,
        transaction_date: req.body.transaction_date,
        planned_launch: req.body.planned_launch,
        month: req.body.month,
        year: req.body.year,
        method_payment: req.body.method_payment,
        attached: req.body.attached,
        category: req.body.category,
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
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.perPage) || 10;
      const transactionsCount = await TransactionModel.countDocuments({ id });
      // Calcula o índice do primeiro resultado da página atual
      const startIndex = (page - 1) * perPage;

      const transactions = await TransactionModel.find({ id })
        .skip(startIndex) // Pula os resultados anteriores à página atual
        .limit(perPage) // Limita o número de resultados na página
        .sort({ createdAt: -1 });

      res.json({
        transactions,
        totalCount: transactionsCount
      })

    } catch(error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao tentar acessar as informações, por favor tente mais tarde' });
    }
  },

  getFilter: async (req, res) => {
    try {
      const { id } = req.user;
      const filter = req.params.filter;
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.perPage) || 10;
      // const transactionsCount = await TransactionModel.countDocuments({ id });
      // Calcula o índice do primeiro resultado da página atual
      const startIndex = (page - 1) * perPage;

      const [filterKey, filterValue] = filter.split('=');
      const filterObject = { [filterKey]: filterValue };

      const transactionsFinder = await TransactionModel.find({ id, ...filterObject })
        .where(filter);


      const transactions = await TransactionModel.find({ id, ...filterObject })
        .where(filter)
        .skip(startIndex) // Pula os resultados anteriores à página atual
        .limit(perPage); // Limita o número de resultados na página


      res.json({
        transactions,
        totalCount: transactionsFinder.length
      })

    } catch(e) {
      console.log(e);
      res.status(500).json({ error: 'Internal server error' });
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
        installment: req.body.installment,
        installment_total: req.body.installment_total,
        planned_launch: req.body.planned_launch,
        transaction_date: req.body.transaction_date,
        month: req.body.month,
        year: req.body.year,
        category: req.body.category,
        method_payment: req.body.method_payment
      }

      const updatetransaction = await TransactionModel.findByIdAndUpdate(id, transaction)

      if(!updatetransaction) {
        res.status(404).json({ msg: "Fin não encontrado." })
        return
      }

      res.status(200).json({transaction, msg: "Serviço atualizado com sucesso!"})

    } catch (e) {
      res.status(500).json({ msg: "Erro ao atualizar transação." });
    }

  }

}

module.exports = transactionController