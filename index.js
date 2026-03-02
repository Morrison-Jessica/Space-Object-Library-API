// Load the Express framework.
const express = require('express')
// Create the app instance.
const app = express()

// Set EJS as the template engine.
app.set('view engine', 'ejs')
// Set the folder that stores EJS view files.
app.set('views', './views')
// Serve static files from the public folder.
app.use(express.static('public'))
// Parse form body data.
app.use(express.urlencoded({ extended: false }))
// Allow HTML forms to trigger PUT and DELETE via query string.
app.use((req, res, next) => {
  if (req.method === 'POST' && req.query && typeof req.query._method === 'string') {
    req.method = req.query._method.toUpperCase()
  }
  next()
})

// Load the RESTful routers.
const routers = require('./routers/index.js')

// Send a welcome message on the home route.
app.get('/', (req, res) => {
  res
    .status(200)
    .send('Welcome to Star Tracker Library')
})

// Register each RESTful router.
app.use('/planets', routers.planet)
app.use('/stars', routers.star)
app.use('/galaxies', routers.galaxy)

// Start the server on port 3000.
app.listen(3000)
