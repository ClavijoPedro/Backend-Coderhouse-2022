import  dotenv from 'dotenv'
dotenv.config()


export default{
    mongoDB: process.env.MONGO_DB_URI,
}


