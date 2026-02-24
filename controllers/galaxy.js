//💚
const { Galaxy, Star } = require('../models');

const parseId = (value) => Number.parseInt(value, 10);

//💚 Show all resources 💚 
const index = async (req, res) => {
  try {
    const galaxies = await Galaxy.findAll({
      include: [{ model: Star, as: 'stars' }]
    });

    // Respond with an array and 2xx status code
    res.status(200).json(galaxies)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch galaxies.' });
  }
}

//💚 Show SINGLE resource :id 💚
const show = async (req, res) => {
  const id = parseId(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid galaxy id.' });

  try {
    const galaxy = await Galaxy.findByPk(id, {
      include: [{ model: Star, as: 'stars' }]
    });

    if (!galaxy) return res.status(404).json({ error: 'Galaxy not found.' });

    // Respond with a single object and 2xx code
    res.status(200).json(galaxy)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch galaxy.' });
  }
}

//💚 Create a NEW resource 💚
const create = async (req, res) => {
  const payload = req.body || {};
  if (!Object.keys(payload).length) return res.status(400).json({ error: 'Request body is required.' });

  try {
    const galaxy = await Galaxy.create(payload);

    // Issue a redirect with a success 2xx code
    res.status(201).json(galaxy)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create galaxy.', details: error.message });
  }
}

//💚 UPDATE an existing resource :id 💚
const update = async (req, res) => {
  const id = parseId(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid galaxy id.' });

  const payload = req.body || {};
  if (!Object.keys(payload).length) return res.status(400).json({ error: 'Request body is required.' });

  try {
    const galaxy = await Galaxy.findByPk(id);
    if (!galaxy) return res.status(404).json({ error: 'Galaxy not found.' });

    await galaxy.update(payload);

    // Respond with a single resource and 2xx code
    res.status(200).json(galaxy)
  } catch (error) {
    res.status(400).json({ error: 'Failed to update galaxy.', details: error.message });
  }
}

//💚 REMOVE a single resource :id 💚
const remove = async (req, res) => {
  const id = parseId(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid galaxy id.' });

  try {
    const deleted = await Galaxy.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Galaxy not found.' });

    // Respond with a 2xx status code and bool
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete galaxy.' });
  }
}

// Export all controller actions
module.exports = { index, show, create, update, remove }
