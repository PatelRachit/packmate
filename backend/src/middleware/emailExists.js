import { ERROR_CODE } from '../constant/errorCode.js'
import { getDb } from '../config/mongo.js'
import { buildErrObject } from '../utils/buildErrObject.js'

const { EMAIL_ALREADY_EXISTS } = ERROR_CODE

const emailExists = async (email) => {
  try {
    const db = getDb()
    const usersCollection = db.collection('users')

    const item = await usersCollection.findOne({ email })

    if (item) {
      console.log(item)
      throw buildErrObject(422, EMAIL_ALREADY_EXISTS)
    }

    return false
  } catch (err) {
    if (err.code && err.message) {
      throw err
    }
    throw buildErrObject(422, err.message)
  }
}

export { emailExists }
