// Map Star REST routes to controller actions.
const express = require('express')

const starCtlr = require('../controllers/star.js')

// Create the Star router.
const router = express.Router()

// Register Star REST endpoints.
router.get('/', starCtlr.index)
router.post('/', starCtlr.create)
router.get('/:id', starCtlr.show)
router.put('/:id', starCtlr.update)
router.delete('/:id', starCtlr.remove)

// Export the Star router.
module.exports = router
