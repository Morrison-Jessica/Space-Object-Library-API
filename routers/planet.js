// Map Planet REST routes to controller actions.
const express = require('express')

const planetCtlr = require('../controllers/planet.js')

// Create the Planet router.
const router = express.Router()

// Register Planet REST endpoints.
router.get('/', planetCtlr.index)
router.post('/', planetCtlr.create)
router.get('/:id', planetCtlr.show)
router.put('/:id', planetCtlr.update)
router.delete('/:id', planetCtlr.remove)

// Export the Planet router.
module.exports = router
