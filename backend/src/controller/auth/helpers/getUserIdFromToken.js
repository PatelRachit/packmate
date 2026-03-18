import jwt from 'jsonwebtoken'
import { ERROR_CODE } from '../../../constant/index.js'
import { decrypt } from '../../../middleware/auth/dcrypt.js'
import { buildErrObject } from '../../../utils/index.js'

const { BAD_TOKEN } = ERROR_CODE

/**
 * Gets user id from token
 * @param {string} token - Encrypted and encoded token
 */
const getUserIdFromToken = (token = '') =>
  new Promise((resolve, reject) => {
    // Decrypts, verifies and decode token
    jwt.verify(decrypt(token), process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(buildErrObject(409, BAD_TOKEN))
      }
      resolve(decoded.data._id)
    })
  })

export { getUserIdFromToken }
