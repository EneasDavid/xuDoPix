import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

async function connect(){
    mongoose.connect(process.env.MONGO_URL)
    return mongoose.connection
}

export default connect