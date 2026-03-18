import { matchedData } from 'express-validator'
import { STATUS_CODE } from '../../constant/statusCode.js'
import { emailExists } from '../../middleware/index.js'
import { handleError } from '../../utils/handleError.js'
import { createUserInDb } from './helpers/createUserInDb.js'

const createUser = async (req, res) => {
  try {
    const requestData = matchedData(req)
    const doesEmailExists = await emailExists(requestData.email)
    if (!doesEmailExists) {
      const item = await createUserInDb(req.body)
      res.status(STATUS_CODE.CREATED).json(item)
    }
  } catch (error) {
    handleError(res, error)
  }
}

export { createUser }
