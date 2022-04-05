import  dotenv from 'dotenv'
dotenv.config()


export default{
    mongoDB: process.env.MONGO_DB_URI,
    facebookID: process.env.FACEBOOK_ID,
    facebookSECRET: process.env.FACEBOOK_SECRET
}


