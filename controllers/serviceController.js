const { Service: ServiceModel } = require("../models/Service")

const serviceController = {
  
  create: async(req, res) => {
    const { id } = req.user
    try {
      const service = {
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        value: req.body.value,
        month: req.body.month,
        method_payment: req.body.method_payment,
        attached: req.body.attached,
        id: id
      }

      const response = await ServiceModel.create(service)

      res.status(201).json({ response, msg: "Fin criado com sucesso!" })

    } catch(e) {
      console.log(e);
    }
  },

  getAll: async (req, res) => {
    try {
      const { id } = req.user;
    
      .limit(perPage); // Limita o número de resultados na página


      res.json(services)

    } catch(e) {
      console.log(e);
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const services = await ServiceModel.findById(id);

      if (!services) {
        res.status(404).json({ msg: "Fin não encontrado." })
        return
      }
      res.json(services)

    } catch(e) {
      console.log(e);
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const services = await ServiceModel.findById(id);

      if (!services) {
        res.status(404).json({ msg: "Fin não encontrado." })
        return
      }
      
      const deleteService = await ServiceModel.findByIdAndDelete(id)

      res.status(200).json({deleteService, msg: "Fin excluido com sucesso!"})

    } catch(e) {
      console.log(e);
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;

      const service = {
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        value: req.body.value,
        month: req.body.month,
        method_payment: req.body.method_payment,
        attached: req.bosy.attached
      }

      const updateService = await ServiceModel.findByIdAndUpdate(id, service)

      if(!updateService) {
        res.status(404).json({ msg: "Fin não encontrado." })
        return
      }

      res.status(200).json({service, msg: "Serviço atualizado com sucesso!"})

    } catch (e) {

    }

  }

}

module.exports = serviceController