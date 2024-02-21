import express from 'express'
import logger from 'morgan'
import path from 'path'
import session from 'express-session'
import { fileURLToPath } from 'url'
import { userRouter } from './routes/user_route.js'
import { snipRouter } from './routes/snip_route.js'
import { connectDB } from './models/db_conn.js'
import * as msgs from './const/messages.js'

const __filename = fileURLToPath(import.meta.url) // ES6 version of __filename
const __dirname = path.dirname(__filename) // ES6 version of __dirname
export const __prefix = path.join(__dirname, 'views')

const port = 8000
const app = express()

app.use(logger('dev'))
app.set('view engine', 'ejs')
app.set('views', 'src/views')
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded({ extended: true })) // allows to access req.body data from POST or PUT requests

app.use(session({
  cookie: {
    maxAge: 600000 // session lasts 10 minutes
  },
  resave: false, // don't save session if unmodified
  saveUninitialized: true, // true = create session even before something is stored
  secret: 'keyboard cat' // a secret string used to sign the session ID cookie
}))

app.use((req, res, next) => { // takes the flashmessage from the request.session and assingns it to res.data
  res.data = {}
  res.data.flashMessage = null
  if (req.session && req.session.flashMessage) {
    res.data.flashMessage = req.session.flashMessage
    req.session.flashMessage = null
  }
  next()
})

app.use((req, res, next) => { // alerts the user that the session is expired (for authorized actions) and redirects to home
  if (req.path === '/snip/create' || req.path === '/snip/delete' || req.path === '/snip/edit') {
    if (req.session && req.session.user) { // req.session.user can be a username string or null
      next()
    } else {
      req.session.flashMessage = msgs.sessionExpiredMsg() // load session expired flash message
      res.redirect('/')
    }
  } else {
    next()
  }
})

app.get('/', (req, res) => {
  res.render('templates/default', { body: `${__prefix}/user/home`, flash: res.data.flashMessage, user: req.session.user })
})

app.use('/user', userRouter)
app.use('/snip', snipRouter)

app.use((req, res, next) => {
  res.status(404).send(msgs.Msg404())
})

app.use((err, req, res, next) => {
  res.status(500).send(msgs.Msg500())
  console.log(err)
})

connectDB()

/**
 * Export () as the default method of app.
 * In app.js, import app and use app(). This will automatically call listen.
 */
export default () => {
  app.listen(port, () => {
    console.log(msgs.listeningMsg(port))
  })
}
