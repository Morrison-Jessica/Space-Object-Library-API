// Map Star REST routes to controller actions.
const express = require('express')

const starCtlr = require('../controllers/star.js')
const buildUploader = require('../middleware/upload.js')
const uploadStarImage = buildUploader('stars')

// Create the Star router.
const router = express.Router()

// Register Star REST endpoints.
router.get('/', starCtlr.index)
router.get('/new', starCtlr.newForm)
router.get('/:id/edit', starCtlr.editForm)
router.post('/', uploadStarImage.single('image'), starCtlr.create)
router.get('/:id', starCtlr.show)
router.put('/:id', uploadStarImage.single('image'), starCtlr.update)
router.delete('/:id', starCtlr.remove)

// Export the Star router.
module.exports = router
