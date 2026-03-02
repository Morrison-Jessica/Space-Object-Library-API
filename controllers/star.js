// Handle Star REST actions.

// Return all stars.
const index = (req, res) => {
  res.status(200).json(['Star#index'])
}

// Return one star by id.
const show = (req, res) => {
  res.status(200).json('Star#show(:id)')
}

// Create a new star.
const create = (req, res) => {
  res.redirect('/stars', 201)
}

// Update one star by id.
const update = (req, res) => {
  res.status(200).json(`/stars/${req.params.id}`)
}

// Delete one star by id.
const remove = (req, res) => {
  res.status(204).json(true)
}

// Export all Star actions.
module.exports = { index, show, create, update, remove }
