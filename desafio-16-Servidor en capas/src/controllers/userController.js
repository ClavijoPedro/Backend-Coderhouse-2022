import path from 'path'


const getInitial = (req,res) => {
    res.redirect('/datos');
};

const getLogin = (req,res) => {
    res.sendFile(path.join(process.cwd(),'../public/login.html'))
};

const getLoginError = (req,res) => {
    res.sendFile(path.join(process.cwd(),'../public/loginError.html'))
};

const getRegister = (req,res) => {
    res.sendFile(path.join(process.cwd(),'../public/register.html'))
};

const getRegisterError = (req,res) => {
    res.sendFile(path.join(process.cwd(),'../public/registerError.html'))

};

const getLogout = (req,res) => {
    req.logout()
    res.redirect('/')
}

export default{
    getInitial,
    getLogin,
    getLoginError,
    getRegister,
    getRegisterError,
    getLogout
}