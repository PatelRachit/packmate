import crypto from 'crypto'

const secret = process.env.JWT_SECRET || 'SecretKey123'
const algorithm = 'aes-128-cbc'

const key = crypto.scryptSync(secret, 'salt', 16)
const iv = Buffer.alloc(16, 0)

/**
 * Decrypts text
 */
const decrypt = (text = '') => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv)

  try {
    let decrypted = decipher.update(text, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  } catch (err) {
    return err
  }
}

export { decrypt }
