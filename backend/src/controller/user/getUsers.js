import { STATUS_CODE } from '../../constant/index.js'
import { handleError } from '../../utils/index.js'
import { getAllUsers } from './helpers/getAllUsers.js'

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers()

    res.status(STATUS_CODE.SUCCESS).json(users)
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

export { getUsers }
