import { logger } from '../utils/logger.js';


const getInitial = (req,res) => {
    res.redirect('/login')
};

const uploads = async (req,res) => {
    try{
        const user = await req.user
        if(user){
            res.send(user.avatar)
        }else{
            res.send('Imagen no disponible')
        }
    }catch(error){logger.error(error)}
}


const logOut = (req,res) => {
    req.logout();
    res.send('Sesión finalizada');
};


const loginError = (req,res) => {
    res.send('Login_Error: Usuario no registrado')
};


const signupError = (req, res) => {
    res.send('Signup_Error: Registro fallido')
};


export default {
    getInitial,
    uploads,
    logOut,
    signupError,
    loginError
}
