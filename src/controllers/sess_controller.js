
export const sessController = {}


export async function sessionValid (req, res, next) {
  if (req.session && req.session.user) { // req.session.user can be a username string or null
    next()
  } else {
    req.session.flashMessage = msgs.sessionExpiredMsg() // load session expired flash message
    res.redirect('/')
  }
}
