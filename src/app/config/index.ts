import dotenv from 'dotenv'
import path from 'path'


dotenv.config({path: path.join((process.cwd(),'.env'))})

export default {
    port:process.env.PORT,
    database_url:process.env.DATABASE_URL,
    jwt_access_secret:process.env.jwt_access_secret,
    bcrypt_salt_rounds: process.env.Bcrypt_Salt_Rounds,
}