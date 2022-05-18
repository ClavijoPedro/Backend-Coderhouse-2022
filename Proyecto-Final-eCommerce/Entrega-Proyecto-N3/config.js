import  dotenv, { config } from 'dotenv'
dotenv.config()
//para SMS sacar el 9 del tel
//si el nombre de la prop es igual a la del .env no la reconoce

export default{
    MONGO_URI: process.env.MONGO_DB_URI,
    PORT: process.env.PORT || 3000,
    MODO : process.argv[2],
    PRIVATE_KEY: process.env.PRIVATE__KEY,
    EMAIL_USER: process.env.EMAIL__USER,
    EMAIL_PASS: process.env.EMAIL__PASS,
    TWILIO_SID:process.env.TWILIO__SID,
    TWILIO_TOKEN:process.env.TWILIO__TOKEN,
    TWILIO_TRIAL_NUMBER: process.env.TWILIO_TRIAL_NUMBER, //para SMS
    TWILIO_WHTSP_TRIAL_NUMBER:'whatsapp:+14155238886',
    TWILIO_TO_NUMBER:'whatsapp:+5491161222224'
}


