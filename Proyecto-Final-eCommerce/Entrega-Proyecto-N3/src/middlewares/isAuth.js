
export default function isAuth(req,res,next){
    req.isAuthenticated() ? next() : res.send('Usuario no logueado');
};




