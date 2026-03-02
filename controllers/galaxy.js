// Handle Galaxy REST actions.

// Return all galaxies.
const index = (req, res) => {
  res.status(200).json(['Galaxy#index'])
}

// Return one galaxy by id.
const show = (req, res) => {
  res.status(200).json('Galaxy#show(:id)')
}

// Create a new galaxy.
const create = (req, res) => {
  res.redirect('/galaxies', 201)
}

// Update one galaxy by id.
const update = (req, res) => {
  res.status(200).json(`/galaxies/${req.params.id}`)
}

// Delete one galaxy by id.
const remove = (req, res) => {
  res.status(204).json(true)
}

// Export all Galaxy actions.
module.exports = { index, show, create, update, remove }
