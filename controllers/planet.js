// Handle Planet REST actions.
const samplePlanets = [
  { id: 1, name: 'Mercury' },
  { id: 2, name: 'Venus' },
  { id: 3, name: 'Earth' }
]

// Return all planets.
const index = (req, res) => {
  res.status(200).render('planets/index', { planets: samplePlanets })
}

// Return one planet by id.
const show = (req, res) => {
  const planetId = Number(req.params.id)
  const planet = samplePlanets.find((item) => item.id === planetId) || { id: planetId, name: 'Unknown Planet' }
  res.status(200).render('planets/show', { planet })
}

// Render the new planet page.
const newForm = (req, res) => {
  res.status(200).render('planets/new')
}

// Render the edit planet page.
const editForm = (req, res) => {
  const planetId = Number(req.params.id)
  const planet = samplePlanets.find((item) => item.id === planetId) || { id: planetId, name: 'Unknown Planet' }
  res.status(200).render('planets/edit', { planet })
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
module.exports = { index, show, newForm, editForm, create, update, remove }
