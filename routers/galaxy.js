//🩷
// Load in Express framework
const express = require(`express`)
// Load in controller/action instances
const galaxyCtlr = require(`../controllers/galaxy.js`)

//🩷 New Router instance 
const router = new express.Router()

//🩷 Route paths
// GET /galaxies -> index (all galaxies)
router.get(`/`, galaxyCtlr.index)
// POST /galaxies -> create (new galaxy)
router.post(`/`, galaxyCtlr.create)
// GET /galaxies/:id -> show (single galaxy)
router.get(`/:id`, galaxyCtlr.show)
// PUT /galaxies/:id -> update (replace/update galaxy)
router.put(`/:id`, galaxyCtlr.update)
// DELETE /galaxies/:id -> remove (delete galaxy)
router.delete(`/:id`, galaxyCtlr.remove)

//🩷 export "router"
module.exports = router
