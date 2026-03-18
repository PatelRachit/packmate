import { ObjectId } from 'mongodb'
import { ERROR_CODE } from '../../../constant/index.js'
import { getDb } from '../../../config/mongo.js'
import { itemNotFound } from '../../../utils/index.js'

const { NOT_FOUND } = ERROR_CODE

/**
 * Finds user by ID
 */
export const findUserById = async (userId) => {
  const db = getDb()
  const usersCollection = db.collection('users')

  const user = await usersCollection.findOne(
    { _id: new ObjectId(userId) },
    {
      projection: {
        createdAt: 0,
        updatedAt: 0,
        password: 0,
      },
    },
  )

  await itemNotFound(null, user, NOT_FOUND)
  return user
}
