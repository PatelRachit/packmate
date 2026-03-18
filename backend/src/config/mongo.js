import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGO_URI
const client = new MongoClient(uri)
let dbConnection = null

export default async function connectDB() {
  try {
    await client.connect()
    console.log('****************************')
    console.log('*    Starting Server')
    console.log('*    Database: MongoDB')
    console.log('****************************')

    dbConnection = client.db(process.env.DB_NAME)
  } catch (err) {
    console.log('Error connecting to MongoDB:', err)
    throw err
  }
}

export function getDb() {
  if (!dbConnection) throw new Error('MongoDB not initialized yet')
  return dbConnection
}
