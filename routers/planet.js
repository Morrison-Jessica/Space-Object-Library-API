// Map Planet REST routes to controller actions.
const express = require('express')

const planetCtlr = require('../controllers/planet.js')
const buildUploader = require('../middleware/upload.js')
const uploadPlanetImage = buildUploader('planets')

// Create the Planet router.
const router = express.Router()

// Register Planet REST endpoints.
router.get('/', planetCtlr.index)
router.get('/new', planetCtlr.newForm)
router.get('/:id/edit', planetCtlr.editForm)
router.post('/', uploadPlanetImage.single('image'), planetCtlr.create)
router.get('/:id', planetCtlr.show)
router.put('/:id', uploadPlanetImage.single('image'), planetCtlr.update)
router.delete('/:id', planetCtlr.remove)

// Export the Planet router.
module.exports = router
