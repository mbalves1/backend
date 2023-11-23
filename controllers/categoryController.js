const { Category: CategoryModel } = require("../models/Category")

const categoryController = {
  
  create: async(req, res) => {
    const { id } = req.user
    try {
      const card = {
        categoryname: req.body.categoryname,
        id: id
      }

      const response = await CategoryModel.create(card)

      res.status(201).json({ response, msg: "Categoria criado com sucesso!" })

    } catch(e) {
      console.log(e);
    }
  },

  getAll: async (req, res) => {
    try {
      const { id } = req.user
      const categorys = await CategoryModel.find({ id });

      res.json(categorys)

    } catch(e) {
      console.log(e);
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const category = await CategoryModel.findById(id);

      if (!category) {
        res.status(404).json({ msg: "Categoria não encontrado." })
        return
      }
      
      const deleteService = await CategoryModel.findByIdAndDelete(id)

      res.status(200).json({deleteService, msg: "Categoria excluido com sucesso!"})

    } catch(e) {
      console.log(e);
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;

      const category = {
        categoryname: req.body.categoryname,
      }

      const updatecategory = await CategoryModel.findByIdAndUpdate(id, category)

      if(!updatecategory) {
        res.status(404).json({ msg: "Categoria não encontrado." })
        return
      }

      res.status(200).json({category, msg: "Categoria atualizado com sucesso!"})

    } catch (e) {
      console.log(e);
    }

  }

}

module.exports = categoryController