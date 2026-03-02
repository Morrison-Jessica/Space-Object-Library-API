// Handle Galaxy REST actions.
const sampleGalaxies = [
  { id: 1, name: 'Milky Way', imageUrl: null },
  { id: 2, name: 'Andromeda', imageUrl: null },
  { id: 3, name: 'Triangulum', imageUrl: null }
]
let nextGalaxyId = 4

// Detect when the client requests JSON.
const wantsJson = (req) => {
  const contentType = req.get('content-type') || ''
  const accept = req.get('accept') || ''
  return contentType.includes('application/json') || accept.includes('application/json')
}

// Return all galaxies.
const index = (req, res) => {
  if (wantsJson(req)) {
    return res.status(200).json(sampleGalaxies)
  }
  return res.status(200).render('galaxies/index', { galaxies: sampleGalaxies })
}

// Return one galaxy by id.
const show = (req, res) => {
  const galaxyId = Number(req.params.id)
  const galaxy = sampleGalaxies.find((item) => item.id === galaxyId)
  if (!galaxy) {
    if (wantsJson(req)) {
      return res.status(404).json({ error: 'Galaxy not found' })
    }
    return res.status(404).send('Galaxy not found')
  }
  if (wantsJson(req)) {
    return res.status(200).json(galaxy)
  }
  return res.status(200).render('galaxies/show', { galaxy })
}

// Render the new galaxy page.
const newForm = (req, res) => {
  if (wantsJson(req)) {
    return res.status(200).json({ message: 'Send POST /galaxies with JSON body.' })
  }
  return res.status(200).render('galaxies/new')
}

// Render the edit galaxy page.
const editForm = (req, res) => {
  const galaxyId = Number(req.params.id)
  const galaxy = sampleGalaxies.find((item) => item.id === galaxyId)
  if (!galaxy) {
    if (wantsJson(req)) {
      return res.status(404).json({ error: 'Galaxy not found' })
    }
    return res.status(404).send('Galaxy not found')
  }
  if (wantsJson(req)) {
    return res.status(200).json({ message: 'Send PUT /galaxies/:id with JSON body.', galaxy })
  }
  return res.status(200).render('galaxies/edit', { galaxy })
}

// Create a new galaxy.
const create = (req, res) => {
  const name = (req.body.name || '').trim() || 'Unnamed Galaxy'
  const imageUrl = req.file ? `/uploads/galaxies/${req.file.filename}` : null
  const galaxy = { id: nextGalaxyId, name, imageUrl }
  sampleGalaxies.push(galaxy)
  nextGalaxyId += 1
  if (wantsJson(req)) {
    return res.status(201).json(galaxy)
  }
  return res.redirect(`/galaxies/${galaxy.id}`)
}

// Update one galaxy by id.
const update = (req, res) => {
  const galaxyId = Number(req.params.id)
  const galaxy = sampleGalaxies.find((item) => item.id === galaxyId)
  if (!galaxy) {
    if (wantsJson(req)) {
      return res.status(404).json({ error: 'Galaxy not found' })
    }
    return res.status(404).send('Galaxy not found')
  }
  const nextName = (req.body.name || '').trim()
  if (nextName) {
    galaxy.name = nextName
  }
  if (req.file) {
    galaxy.imageUrl = `/uploads/galaxies/${req.file.filename}`
  }
  if (wantsJson(req)) {
    return res.status(200).json(galaxy)
  }
  return res.redirect(`/galaxies/${galaxyId}`)
}

// Delete one galaxy by id.
const remove = (req, res) => {
  const galaxyId = Number(req.params.id)
  const indexToRemove = sampleGalaxies.findIndex((item) => item.id === galaxyId)
  if (indexToRemove < 0) {
    if (wantsJson(req)) {
      return res.status(404).json({ error: 'Galaxy not found' })
    }
    return res.status(404).send('Galaxy not found')
  }
  const [deletedGalaxy] = sampleGalaxies.splice(indexToRemove, 1)
  if (wantsJson(req)) {
    return res.status(200).json({ deleted: true, galaxy: deletedGalaxy })
  }
  return res.redirect('/galaxies')
}

// Export all Galaxy actions.
module.exports = { index, show, newForm, editForm, create, update, remove }
