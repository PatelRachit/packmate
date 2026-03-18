import express from 'express'
import authRouter from './auth.js'
import createUser from './user.js'

const router = express.Router()

router.use('/', authRouter)
router.use('/user', createUser)

router.get('/test', (req, res) => {
  try {
    console.log('API is working')
    res.status(200).json({ message: 'API is working' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
