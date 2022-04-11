//__dirname para ESmodules
import path from 'path';
const __dirname = path.resolve();




//*==================================[LOGIN]======================================*//


function getInitial(req,res) {
    res.redirect('/login')
};


function getLogin(req,res){
    res.sendFile(__dirname + '/public/login.html')
};


//*==================================[LOGOUT]======================================*//


function getLogout(req,res){
    req.logout()
    res.redirect('/')
};




export default{
    getInitial,
    getLogin,
    getLogout,
}