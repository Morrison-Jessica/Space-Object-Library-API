//🩷

// Load in all routers
const galaxy = require('./galaxy.js')
const planet = require('./planet.js')
const star   = require('./star.js')

//🩷 Export all routers as object for app mounting in index.js
module.exports = { galaxy, planet, star }
