import { getDb } from '../../../config/mongo.js'
import { hashPassword } from '../../../middleware/auth/hashPassword.js'
/**
 * Creates a new item in database
 */
export const createUserInDb = async (userData) => {
  const usersCollection = getDb().collection('users')

  const newUser = {
    name: userData.name,
    email: userData.email.toLowerCase(),
    password: await hashPassword(userData.password),
    major: userData.major,
    graduationYear: userData.graduationYear,
    favourites: [],
    totalCheckIns: 0,
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await usersCollection.insertOne(newUser)
  return await usersCollection.findOne({ _id: result.insertedId })
}
