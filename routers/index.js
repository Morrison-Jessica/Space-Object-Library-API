// Collect each resource router in one place.
const galaxy = require('./galaxy.js')
const planet = require('./planet.js')
const star = require('./star.js')

// Export all routers.
module.exports = { galaxy, planet, star }
