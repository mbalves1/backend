const { Service: ServiceModel } = require("../models/Service")

const serviceController = {
  
  create: async(req, res) => {
    try {
      const service = {
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        value: req.body.value,
        mounth: req.body.mounth
      }

      const response = await ServiceModel.create(service)

      res.status(201).json({ response, msg: "Fin criado com sucesso!" })

    } catch(e) {
      console.log(e);
    }
  },

  getAll: async (req, res) => {
    try {
      const services = await ServiceModel.find();

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
        mounth: req.body.mounth
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