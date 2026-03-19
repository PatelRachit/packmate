import express from 'express'
import trimRequest from 'trim-request'
import { createUser, getUsers } from '../controller/user/index.js'

const router = express.Router()

router.get('/', trimRequest.all, getUsers)
router.post('/', trimRequest.all, createUser)

export default router
