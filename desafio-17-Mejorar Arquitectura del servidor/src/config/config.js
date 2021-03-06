import  dotenv from 'dotenv'
dotenv.config()
import yargs from 'yargs'
//*==================================[NOTA]======================================*//

//PARA FUNCIONALIDAD DE ENVIO DE MAILS Y WHTASAPP DESACTIVAR EVENTUALMENTE EL ANTIVIRUS
//HABILITAR SANDBOX TWILIO PARA REALIZAR LAS PRUEBAS DE WHATSAPP (DURA SOLO 24HS)
//PARA ENVIO DE SMS LOCAL QUITAR EL 9 DEL NUMERO DE TEL, PARA WHATSAPP AGREGARLO ES INT.
/*
    EJ. FORMATO TEL INT : +5491155550000
    EJ. FORMATO TEL LOCAL : +541155550000
*/

//*==================================[]======================================*//

const args = yargs(process.argv.slice(2)).argv;
console.log(args.db)


export default{
    MONGO_URI: process.env.MONGO_DB_URI,
    DB_CLIENT: args.db,
    PORT: process.env.PORT || 3000,
    MODO : process.argv[2],
    PRIVATE_KEY: process.env.PRIVATE__KEY,
    ADMIN_PASS: process.env.ADMIN__PASS,
    EMAIL_USER: process.env.EMAIL__USER,
    EMAIL_PASS: process.env.EMAIL__PASS,
    TWILIO_SID:process.env.TWILIO__SID,
    TWILIO_TOKEN:process.env.TWILIO__TOKEN,
    TWILIO_TRIAL_NUMBER: process.env.TWILIO__TRIAL_NUMBER, //para SMS
    TWILIO_WHTSP_TRIAL_NUMBER:process.env.TWILIO__WHTSP_TRIAL_NUMBER,

    
    //VARIABLES GLOBALES PARA ENVIO DE EMAIL Y WHATSAP A ADMIN
    ADMIN_EMAIL:process.env.ADMIN__EMAIL,
    ADMIN_PHONE:process.env.ADMIN__PHONE,
 
}


