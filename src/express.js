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
    maxAge: 20000 // 600.000 = 10 minutes | 60.000 = 1 minute | 10.000 = 10 seconds
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
