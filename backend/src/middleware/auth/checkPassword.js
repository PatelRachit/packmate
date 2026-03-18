import { buildErrObject } from '../../utils/buildErrObject.js'
import bcrypt from 'bcrypt'

const checkPassword = async (password, user) => {
  try {
    return await bcrypt.compare(password, user.password)
  } catch (error) {
    throw buildErrObject(422, error.message)
  }
}
export { checkPassword }
