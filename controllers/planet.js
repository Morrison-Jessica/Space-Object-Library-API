// Handle Planet REST actions.
const samplePlanets = [
  { id: 1, name: 'Mercury' },
  { id: 2, name: 'Venus' },
  { id: 3, name: 'Earth' }
]
let nextPlanetId = 4

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
  const name = (req.body.name || '').trim() || 'Unnamed Planet'
  const planet = { id: nextPlanetId, name }
  samplePlanets.push(planet)
  nextPlanetId += 1
  res.redirect(`/planets/${planet.id}`)
}

// Update one planet by id.
const update = (req, res) => {
  const planetId = Number(req.params.id)
  const planet = samplePlanets.find((item) => item.id === planetId)
  if (planet) {
    const nextName = (req.body.name || '').trim()
    if (nextName) planet.name = nextName
  }
  res.redirect(`/planets/${planetId}`)
}

// Delete one planet by id.
const remove = (req, res) => {
  const planetId = Number(req.params.id)
  const indexToRemove = samplePlanets.findIndex((item) => item.id === planetId)
  if (indexToRemove >= 0) {
    samplePlanets.splice(indexToRemove, 1)
  }
  res.redirect('/planets')
}

// Export all Planet actions.
module.exports = { index, show, newForm, editForm, create, update, remove }
