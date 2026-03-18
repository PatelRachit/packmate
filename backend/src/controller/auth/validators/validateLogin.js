import { check } from 'express-validator'
import { EMAIL_REGEX, ERROR_CODE } from '../../../constant/index.js'
import { validateResult } from '../../../utils/index.js'

const { MISSING, IS_EMPTY, EMAIL_IS_NOT_VALID, PASSWORD_TOO_SHORT } = ERROR_CODE

/**
 * Validates login request
 */
export const validateLogin = [
  check('email')
    .exists()
    .withMessage(MISSING)
    .not()
    .isEmpty()
    .withMessage(IS_EMPTY)
    .matches(EMAIL_REGEX)
    .withMessage(EMAIL_IS_NOT_VALID),
  check('password')
    .exists()
    .withMessage(MISSING)
    .not()
    .isEmpty()
    .withMessage(IS_EMPTY)
    .isLength({
      min: 6,
    })
    .withMessage(PASSWORD_TOO_SHORT),
  (req, res, next) => {
    validateResult(req, res, next)
  },
]
