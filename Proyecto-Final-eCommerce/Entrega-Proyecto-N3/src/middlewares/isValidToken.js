import config from "../../config";

function isValidToken(req,res,next){
    const token = req.headers['authorization'] || req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'token no entregado'
        })
    }
    const decodedToken = jwt.verify(token, config.PRIVATE_KEY)
    console.log(decodedToken)
    req.user = decodedToken

};