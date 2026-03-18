import { STATUS_CODE } from '../../constant/index.js'
import { handleError, isIDGood } from '../../utils/index.js'
import { findUserById, getUserIdFromToken } from './helpers/index.js'

/**
 * Verify user token function called by route
 */
const verifyUserToken = async (req, res) => {
  try {
    const encryptedToken = req.cookies.authToken
    let userId = await getUserIdFromToken(encryptedToken)
    userId = await isIDGood(userId)
    const user = await findUserById(userId)
    // Removes user info from response
    // delete response.user
    res.status(STATUS_CODE.SUCCESS).json({ user })
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

export { verifyUserToken }
