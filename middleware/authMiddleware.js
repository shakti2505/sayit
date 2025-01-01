import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization ? req.headers.authorization : req.cookies.jwt
    
    if(authHeader==null ||  authHeader==undefined){
        return res.status(401).json({message: "Unauthorized"});
    }

    const token  = authHeader;
    //verify the token

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            return res.status(401).json({message: "Forbidden"});
        }
        req.user = user;
        next();
    });
}
export default authMiddleware;


