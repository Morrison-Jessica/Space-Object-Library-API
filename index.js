//💜
// Load in Express framework
const express       = require(`express`)

// Create a new Express instance called "app"
const app           = express()

//💜 Parse incoming JSON bodies for API requests 💜
app.use(express.json())

//💜 Parse form-urlencoded bodies (from HTML forms / Postman x-www-form-urlencoded) 💜
app.use(express.urlencoded({ extended: true }))

// Load in RESTful routers
const routers = require('./routers/index.js')

//💜 Home page welcome middleware 💜
app.get('/', (req, res) => {
  res
    .status(200)
    .send('Welcome to Star Tracker Library')
})

// Register RESTful routers with our "app"
app.use(`/planets`,  routers.planet)
app.use(`/stars`,    routers.star)
app.use(`/galaxies`, routers.galaxy)

// Set our app to listen on port 3000
app.listen(3000)

//💜 SEQUELIZE https://sequelize.org/docs/v7/category/other-topics/
//💜 DOCKER https://docs.docker.com/?_gl=1*5mvfm8*_gcl_au*Mjc3MTMwNDguMTc3MTkxOTI0NA..*_ga*MjExNDg1NTI1NC4xNzcxOTE5MjQ0*_ga_XJWPQMJYHQ*czE3NzE5MTkyNDQkbzEkZzEkdDE3NzE5MTkyNDUkajU5JGwwJGgw
