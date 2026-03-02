// Handle Planet REST actions.
const samplePlanets = [
  { id: 1, name: 'Mercury', imageUrl: null },
  { id: 2, name: 'Venus', imageUrl: null },
  { id: 3, name: 'Earth', imageUrl: null }
]
let nextPlanetId = 4

// Detect when the client requests JSON.
const wantsJson = (req) => {
  const contentType = req.get('content-type') || ''
  const accept = req.get('accept') || ''
  return contentType.includes('application/json') || accept.includes('application/json')
}

// Return a validation error response.
const badRequest = (req, res, message) => {
  if (wantsJson(req)) {
    return res.status(400).json({ error: message })
  }
  return res.status(400).send(message)
}

// Return a not-found error response.
const notFound = (req, res) => {
  if (wantsJson(req)) {
    return res.status(404).json({ error: 'Planet not found' })
  }
  return res.status(404).send('Planet not found')
}

// Return all planets.
const index = (req, res) => {
  if (wantsJson(req)) {
    return res.status(200).json(samplePlanets)
  }
  return res.status(200).render('planets/index', { planets: samplePlanets })
}

// Return one planet by id.
const show = (req, res) => {
  const planetId = Number(req.params.id)
  if (Number.isNaN(planetId)) {
    return badRequest(req, res, 'Invalid planet id')
  }
  const planet = samplePlanets.find((item) => item.id === planetId)
  if (!planet) {
    return notFound(req, res)
  }
  if (wantsJson(req)) {
    return res.status(200).json(planet)
  }
  return res.status(200).render('planets/show', { planet })
}

// Render the new planet page.
const newForm = (req, res) => {
  if (wantsJson(req)) {
    return res.status(200).json({ message: 'Send POST /planets with JSON body.' })
  }
  res.status(200).render('planets/new')
}

// Render the edit planet page.
const editForm = (req, res) => {
  const planetId = Number(req.params.id)
  if (Number.isNaN(planetId)) {
    return badRequest(req, res, 'Invalid planet id')
  }
  const planet = samplePlanets.find((item) => item.id === planetId)
  if (!planet) {
    return notFound(req, res)
  }
  if (wantsJson(req)) {
    return res.status(200).json({ message: 'Send PUT /planets/:id with JSON body.', planet })
  }
  return res.status(200).render('planets/edit', { planet })
}

// Create a new planet.
const create = (req, res) => {
  const name = (req.body.name || '').trim()
  if (!name) {
    return badRequest(req, res, 'Planet name is required')
  }
  const imageUrl = req.file ? `/uploads/planets/${req.file.filename}` : null
  const planet = { id: nextPlanetId, name, imageUrl }
  samplePlanets.push(planet)
  nextPlanetId += 1
  if (wantsJson(req)) {
    return res.status(201).json(planet)
  }
  return res.redirect(`/planets/${planet.id}`)
}

// Update one planet by id.
const update = (req, res) => {
  const planetId = Number(req.params.id)
  if (Number.isNaN(planetId)) {
    return badRequest(req, res, 'Invalid planet id')
  }
  const planet = samplePlanets.find((item) => item.id === planetId)
  if (!planet) {
    return notFound(req, res)
  }
  if (Object.prototype.hasOwnProperty.call(req.body, 'name') && !(req.body.name || '').trim()) {
    return badRequest(req, res, 'Planet name cannot be empty')
  }
  const nextName = (req.body.name || '').trim()
  if (nextName) {
    planet.name = nextName
  }
  if (req.file) {
    planet.imageUrl = `/uploads/planets/${req.file.filename}`
  }
  if (wantsJson(req)) {
    return res.status(200).json(planet)
  }
  return res.redirect(`/planets/${planetId}`)
}

// Delete one planet by id.
const remove = (req, res) => {
  const planetId = Number(req.params.id)
  if (Number.isNaN(planetId)) {
    return badRequest(req, res, 'Invalid planet id')
  }
  const indexToRemove = samplePlanets.findIndex((item) => item.id === planetId)
  if (indexToRemove < 0) {
    return notFound(req, res)
  }
  const [deletedPlanet] = samplePlanets.splice(indexToRemove, 1)
  if (wantsJson(req)) {
    return res.status(200).json({ deleted: true, planet: deletedPlanet })
  }
  return res.redirect('/planets')
}

// Export all Planet actions.
module.exports = { index, show, newForm, editForm, create, update, remove }
