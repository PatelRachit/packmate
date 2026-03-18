import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  },
)

// Hash password before saving
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return

  try {
    const SALT_ROUNDS = 10
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
  } catch (error) {
    throw new Error(`Password hashing failed: ${error.message}`, {
      cause: error,
    })
  }
})

// Method to compare passwords
UserSchema.methods.comparePassword = async function (passwordAttempt) {
  try {
    return await bcrypt.compare(passwordAttempt, this.password)
  } catch (error) {
    throw new Error('Password comparison failed', { cause: error })
  }
}

export default mongoose.model('User', UserSchema)
