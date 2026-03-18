/**
 * Creates an object with user info
 */
export const setUserInfo = (req = {}) =>
  new Promise((resolve) => {
    let user = {
      _id: req._id,
      email: req.email,
    }

    resolve(user)
  })
