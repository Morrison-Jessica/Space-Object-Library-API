//💚
const { Star, Galaxy, Planet } = require('../models');

const parseId = (value) => Number.parseInt(value, 10);

//💚 Show all resources
// Show all resources
const index = async (req, res) => {
  try {
    const stars = await Star.findAll({
      include: [
        { model: Galaxy, as: 'galaxy' },
        { model: Planet, as: 'planets', through: { attributes: [] } }
      ]
    });

    // Respond with an array and 2xx status code
    res.status(200).json(stars)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stars.' });
  }
}

//💚 Show SINGLE resource :id
// Show single resource
const show = async (req, res) => {
  const id = parseId(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid star id.' });

  try {
    const star = await Star.findByPk(id, {
      include: [
        { model: Galaxy, as: 'galaxy' },
        { model: Planet, as: 'planets', through: { attributes: [] } }
      ]
    });

    if (!star) return res.status(404).json({ error: 'Star not found.' });

    // Respond with a single object and 2xx code
    res.status(200).json(star)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch star.' });
  }
}

//💚 Create a NEW resource
// Create a new resource
const create = async (req, res) => {
  const payload = req.body || {};
  if (!Object.keys(payload).length) return res.status(400).json({ error: 'Request body is required.' });

  try {
    const star = await Star.create(payload);

    // Issue a redirect with a success 2xx code
    res.status(201).json(star)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create star.', details: error.message });
  }
}

//💚 UPDATE an existing resource :id
// Update an existing resource
const update = async (req, res) => {
  const id = parseId(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid star id.' });

  const payload = req.body || {};
  if (!Object.keys(payload).length) return res.status(400).json({ error: 'Request body is required.' });

  try {
    const star = await Star.findByPk(id);
    if (!star) return res.status(404).json({ error: 'Star not found.' });

    await star.update(payload);

    // Respond with a single resource and 2xx code
    res.status(200).json(star)
  } catch (error) {
    res.status(400).json({ error: 'Failed to update star.', details: error.message });
  }
}

//💚 REMOVE a single resource :id
// Remove a single resource
const remove = async (req, res) => {
  const id = parseId(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid star id.' });

  try {
    const deleted = await Star.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Star not found.' });

    // Respond with a 2xx status code and bool
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete star.' });
  }
}

// Export all controller actions
module.exports = { index, show, create, update, remove }
