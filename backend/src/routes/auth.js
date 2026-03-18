import express from 'express'
import passport from 'passport'
import trimRequest from 'trim-request'
import '../config/passport.js'
import { login, logout, verifyUserToken } from '../controller/auth/index.js'
import { validateLogin } from '../controller/auth/validators/validateLogin.js'

const requireAuth = passport.authenticate('jwt', {
  session: false,
})

const router = express.Router()

router.post('/login', trimRequest.all, validateLogin, login)

router.get('/token', requireAuth, trimRequest.all, verifyUserToken)

router.post('/logout', requireAuth, trimRequest.all, logout)

export default router
