// Map Galaxy REST routes to controller actions.
const express = require('express')

const galaxyCtlr = require('../controllers/galaxy.js')
const buildUploader = require('../middleware/upload.js')
const uploadGalaxyImage = buildUploader('galaxies')

// Create the Galaxy router.
const router = express.Router()

// Register Galaxy REST endpoints.
router.get('/', galaxyCtlr.index)
router.get('/new', galaxyCtlr.newForm)
router.get('/:id/edit', galaxyCtlr.editForm)
router.post('/', uploadGalaxyImage.single('image'), galaxyCtlr.create)
router.get('/:id', galaxyCtlr.show)
router.put('/:id', uploadGalaxyImage.single('image'), galaxyCtlr.update)
router.delete('/:id', galaxyCtlr.remove)

// Export the Galaxy router.
module.exports = router
