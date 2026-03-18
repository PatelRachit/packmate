import express from 'express'
import trimRequest from 'trim-request'
import { createUser, getUsers } from '../controller/user/index.js'
import { validateCreateUser } from '../controller/user/validators/validateCreateUser.js'

const router = express.Router()

router.get('/', trimRequest.all, getUsers)
router.post('/', trimRequest.all, validateCreateUser, createUser)

export default router
