import minimist from 'minimist';
import  dotenv from 'dotenv';
dotenv.config()

const options = {alias: {p:'PORT'}, default:{defPort: 8080}}
const args = minimist(process.argv.splice(2), options)


export default{
    mongoDB: process.env.MONGO_DB_URI,
    facebookID: process.env.FACEBOOK_ID,
    facebookSECRET: process.env.FACEBOOK_SECRET,
    PORT: args.PORT || args.defPort
}


