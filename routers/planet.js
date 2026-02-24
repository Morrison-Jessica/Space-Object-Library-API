//🩷
// Load in Express framework
const express = require(`express`)
// Load controller/action instances
const planetCtlr = require(`../controllers/planet.js`)

//🩷 New Router instance 
const router = new express.Router()

//🩷 Route paths
// GET /planets -> index (all planets)
router.get(`/`, planetCtlr.index)
// POST /planets -> create (new planet)
router.post(`/`, planetCtlr.create)
// GET /planets/:id -> show (single planet)
router.get(`/:id`, planetCtlr.show)
// PUT /planets/:id -> update (replace/update planet)
router.put(`/:id`, planetCtlr.update)
// DELETE /planets/:id -> remove (delete planet)
router.delete(`/:id`, planetCtlr.remove)

//🩷 export "router"
module.exports = router
