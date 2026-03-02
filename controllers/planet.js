// Handle Planet REST actions.

// Return all planets.
const index = (req, res) => {
  res.status(200).json(['Planet#index'])
}

// Return one planet by id.
const show = (req, res) => {
  res.status(200).json('Planet#show(:id)')
}

// Create a new planet.
const create = (req, res) => {
  res.redirect('/planets', 201)
}

// Update one planet by id.
const update = (req, res) => {
  res.status(200).json(`/planets/${req.params.id}`)
}

// Delete one planet by id.
const remove = (req, res) => {
  res.status(204).json(true)
}

// Export all Planet actions.
module.exports = { index, show, create, update, remove }
