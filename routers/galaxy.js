// Map Galaxy REST routes to controller actions.
const express = require('express')

const galaxyCtlr = require('../controllers/galaxy.js')

// Create the Galaxy router.
const router = express.Router()

// Register Galaxy REST endpoints.
router.get('/', galaxyCtlr.index)
router.post('/', galaxyCtlr.create)
router.get('/:id', galaxyCtlr.show)
router.put('/:id', galaxyCtlr.update)
router.delete('/:id', galaxyCtlr.remove)

// Export the Galaxy router.
module.exports = router
