import { ERROR_CODE } from '../../../constant/index.js'
import { getDb } from '../../../config/mongo.js'
import { itemNotFound } from '../../../utils/index.js'

const { NOT_FOUND } = ERROR_CODE

/**
 * Finds user by email
 */
export const findUser = async (email = '') => {
  const db = getDb()
  const usersCollection = db.collection('users')

  const item = await usersCollection.findOne({ email })

  await itemNotFound(null, item, NOT_FOUND)
  return item
}
