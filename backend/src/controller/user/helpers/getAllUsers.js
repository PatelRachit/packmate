import { getDb } from '../../../config/mongo.js'

export const getAllUsers = async () => {
  const usersCollection = getDb().collection('users')

  return await usersCollection
    .find({}, { projection: { password: 0 } })
    .toArray()
}
