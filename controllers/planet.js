//💚 define queries here
//💚 https://sequelize.org/docs/v7/category/querying/
//💚 https://sequelize.org/docs/v7/querying/json/
//💚 https://sequelize.org/docs/v7/querying/operators/
//💚 https://sequelize.org/docs/v7/models/validations-and-constraints/

const { Planet, Star } = require('../models');

const parseId = (value) => Number.parseInt(value, 10);

//💚 Show all resources 💚
const index = async (req, res) => {  // async (req, res)
  // const planets = await Planet.find({})  // .find() to return an array w/ ALL planets
  try {
    const planets = await Planet.findAll({
      include: [{ model: Star, as: 'stars', through: { attributes: [] } }]
    });

    // Respond with an array and 2xx status code
    res.status(200).json(planets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch planets.' });
  }
}

//💚 Show SINGLE resource :id 💚 
const show = async (req, res) => {  // async (req, res)
  // const ... = await Planet. ... ({})  // .findByPK(req.params.id) - primary key
  const id = parseId(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid planet id.' });

  try {
    const planet = await Planet.findByPk(id, {
      include: [{ model: Star, as: 'stars', through: { attributes: [] } }]
    });

    if (!planet) return res.status(404).json({ error: 'Planet not found.' });

    // Respond with a single object and 2xx code
    res.status(200).json(planet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch planet.' });
  }
}

//💚 Create a NEW resource - sequelize does the manual work of building, saving & parsing 💚
// curl -X POST --data "name= ... " http://localhost:3000/plantes // curl -I ... to see headers and status code only
const create = async (req, res) => {  // async (req, res)
  // const ... = await Planet.create({})
  const payload = req.body || {};
  if (!Object.keys(payload).length) return res.status(400).json({ error: 'Request body is required.' });

  try {
    const planet = await Planet.create(payload);

    // Issue a redirect with a success 2xx code
    res.status(201).json(planet);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create planet.', details: error.message });
  }
}

//💚 UPDATE an existing resource :id  // {where: {id}} 💚
const update = async (req, res) => {  // async (req, res)
  // const { name } = await req.body // grabs all body data
  // const { id } = req.params //.id*  // grabs all params as object // *:id grabs just the id
  // const ... = await Planet.update({param goes here}, {param goes here}) // ie  .update({name}, {where: {id}})
  const id = parseId(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid planet id.' });

  const payload = req.body || {};
  if (!Object.keys(payload).length) return res.status(400).json({ error: 'Request body is required.' });

  try {
    const planet = await Planet.findByPk(id);
    if (!planet) return res.status(404).json({ error: 'Planet not found.' });

    await planet.update(payload);

    // Respond with a single resource and 2xx code
    res.status(200).json(planet)
  } catch (error) {
    res.status(400).json({ error: 'Failed to update planet.', details: error.message });
  }
}

//💚 REMOVE a single resource :id  // {where: {id}} 💚
const remove = async (req, res) => {  // async (req, res)
  // const { id } = req.params
  // const deleted = await Planet.destroy({})  // .destroy({where: {id: req.params.id}}) // BOOLEAN - true if deleted, false if not
  const id = parseId(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid planet id.' });

  try {
    const deleted = await Planet.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Planet not found.' });

    // Respond with a 2xx status code and boolean
    res.status(204).send()  // res.json ({ deleted }) // or res.json(true) if you want to return a boolean instead of the deleted resource

    // REDIRECT - instead of returning a boolean
    // if (deleted)
    //   res.redirect(`/planets`, 204) // redirect to index if deleted - sequelize reads `/planets` as (../controllers/planet.js) and looks for the index action
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete planet.' });
  }
}

// Export all controller actions
module.exports = { index, show, create, update, remove }
