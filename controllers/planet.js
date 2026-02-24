//💚 define queries here
//💚 https://sequelize.org/docs/v7/category/querying/
//💚 https://sequelize.org/docs/v7/querying/json/
//💚 https://sequelize.org/docs/v7/querying/operators/
//💚 https://sequelize.org/docs/v7/models/validations-and-constraints/

//💚 Show all resources
const index = (req, res) => {  // async (req, res)
  // const planets = await Planet.find({})  // .find() to return an array w/ ALL planets

  // Respond with an array and 2xx status code
  res.status(200).json([`Planet#index`])
}

//💚 Show SINGLE resource :id 
const show = (req, res) => {  // async (req, res)
  // const ... = await Planet. ... ({})  // .findByPK(req.params.id) - primary key

  // Respond with a single object and 2xx code
  res.status(200).json(`Planet#show(:id)`)
}

//💚 Create a NEW resource - sequelize does the manual work of building, saving & parsing
// curl -X POST --data "name= ... " http://localhost:3000/plantes // curl -I ... to see headers and status code only
const create = (req, res) => {  // async (req, res)
  // const ... = await Planet.create({})

  // Issue a redirect with a success 2xx code
  res.redirect(`/planets`, 201)
}

//💚 UPDATE an existing resource :id  // {where: {id}}
const update = (req, res) => {  // async (req, res)
  // const { name } = await req.body // grabs all body data
  // const { id } = req.params //.id*  // grabs all params as object // *:id grabs just the id
  // const ... = await Planet.update({param goes here}, {param goes here}) // ie  .update({name}, {where: {id}})

  // Respond with a single resource and 2xx code
  res.status(200).json(`/planets/${req.params.id}`, )
}

//💚 REMOVE a single resource :id  // {where: {id}}
const remove = (req, res) => {  // async (req, res)
  // const { id } = req.params
  // const deleted = await Planet.destroy({})  // .destroy({where: {id: req.params.id}}) // BOOLEAN - true if deleted, false if not

  // Respond with a 2xx status code and boolean
  res.status(204).json(true)  // res.json ({ deleted }) // or res.json(true) if you want to return a boolean instead of the deleted resource

  // REDIRECT - instead of returning a boolean
  // if (deleted)
  //   res.redirect(`/planets`, 204) // redirect to index if deleted - sequelize reads `/planets` as (../controllers/planet.js) and looks for the index action
}

// Export all controller actions
module.exports = { index, show, create, update, remove }
