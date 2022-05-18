import jwt from 'jsonwebtoken'
import config from '../../config.js'


export default function generateToken(user) {
    const token = jwt.sign({ data:user }, config.PRIVATE_KEY, {expiresIn:'60s'})
    return token
}