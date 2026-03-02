// Handle Star REST actions.
const sampleStars = [
  { id: 1, name: 'Sun', imageUrl: null },
  { id: 2, name: 'Sirius', imageUrl: null },
  { id: 3, name: 'Polaris', imageUrl: null }
]
let nextStarId = 4

// Detect when the client requests JSON.
const wantsJson = (req) => {
  const contentType = req.get('content-type') || ''
  const accept = req.get('accept') || ''
  return contentType.includes('application/json') || accept.includes('application/json')
}

// Return all stars.
const index = (req, res) => {
  if (wantsJson(req)) {
    return res.status(200).json(sampleStars)
  }
  return res.status(200).render('stars/index', { stars: sampleStars })
}

// Return one star by id.
const show = (req, res) => {
  const starId = Number(req.params.id)
  const star = sampleStars.find((item) => item.id === starId)
  if (!star) {
    if (wantsJson(req)) {
      return res.status(404).json({ error: 'Star not found' })
    }
    return res.status(404).send('Star not found')
  }
  if (wantsJson(req)) {
    return res.status(200).json(star)
  }
  return res.status(200).render('stars/show', { star })
}

// Render the new star page.
const newForm = (req, res) => {
  if (wantsJson(req)) {
    return res.status(200).json({ message: 'Send POST /stars with JSON body.' })
  }
  return res.status(200).render('stars/new')
}

// Render the edit star page.
const editForm = (req, res) => {
  const starId = Number(req.params.id)
  const star = sampleStars.find((item) => item.id === starId)
  if (!star) {
    if (wantsJson(req)) {
      return res.status(404).json({ error: 'Star not found' })
    }
    return res.status(404).send('Star not found')
  }
  if (wantsJson(req)) {
    return res.status(200).json({ message: 'Send PUT /stars/:id with JSON body.', star })
  }
  return res.status(200).render('stars/edit', { star })
}

// Create a new star.
const create = (req, res) => {
  const name = (req.body.name || '').trim() || 'Unnamed Star'
  const imageUrl = req.file ? `/uploads/stars/${req.file.filename}` : null
  const star = { id: nextStarId, name, imageUrl }
  sampleStars.push(star)
  nextStarId += 1
  if (wantsJson(req)) {
    return res.status(201).json(star)
  }
  return res.redirect(`/stars/${star.id}`)
}

// Update one star by id.
const update = (req, res) => {
  const starId = Number(req.params.id)
  const star = sampleStars.find((item) => item.id === starId)
  if (!star) {
    if (wantsJson(req)) {
      return res.status(404).json({ error: 'Star not found' })
    }
    return res.status(404).send('Star not found')
  }
  const nextName = (req.body.name || '').trim()
  if (nextName) {
    star.name = nextName
  }
  if (req.file) {
    star.imageUrl = `/uploads/stars/${req.file.filename}`
  }
  if (wantsJson(req)) {
    return res.status(200).json(star)
  }
  return res.redirect(`/stars/${starId}`)
}

// Delete one star by id.
const remove = (req, res) => {
  const starId = Number(req.params.id)
  const indexToRemove = sampleStars.findIndex((item) => item.id === starId)
  if (indexToRemove < 0) {
    if (wantsJson(req)) {
      return res.status(404).json({ error: 'Star not found' })
    }
    return res.status(404).send('Star not found')
  }
  const [deletedStar] = sampleStars.splice(indexToRemove, 1)
  if (wantsJson(req)) {
    return res.status(200).json({ deleted: true, star: deletedStar })
  }
  return res.redirect('/stars')
}

// Export all Star actions.
module.exports = { index, show, newForm, editForm, create, update, remove }
