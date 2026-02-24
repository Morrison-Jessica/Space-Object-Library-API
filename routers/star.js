//🩷
// Load in Express framework
const express = require(`express`)
// Load in our controller/action instances
const starCtlr = require(`../controllers/star.js`)

//🩷 New Router instance 
const router = new express.Router()

//🩷 Route paths
// GET /stars -> index (all stars)
router.get(`/`, starCtlr.index)
// POST /stars -> create (new star)
router.post(`/`, starCtlr.create)
// GET /stars/:id -> show (single star)
router.get(`/:id`, starCtlr.show)
// PUT /stars/:id -> update (replace/update star)
router.put(`/:id`, starCtlr.update)
// DELETE /stars/:id -> remove (delete star)
router.delete(`/:id`, starCtlr.remove)

//🩷 export "router"
module.exports = router
