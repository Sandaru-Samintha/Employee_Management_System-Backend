import jwt from "jsonwebtoken";
// =================================================================================================
// CROSS Middleware
// =================================================================================================

export const authMiddleware = (req, res, next) => {

    const stringToken = req.header("Authorization") 

    console.log("beforeToken :",stringToken); 

    
    if (stringToken != null) {

        const token = stringToken.replace("Bearer ", ""); 
        console.log("Token :",token);

        const secret = process.env.JWT_SECRET; 
        console.log("Secret Key :",secret); 

        jwt.verify(token, secret, (err, decoded) => {  

            if (decoded != null) {
                console.log("Decoded Token :",decoded);
                 req.userData = decoded;   
                 next();  
            }else{
                return res.status(403).json({  
                    status: "error",
                    message: "Invalid token "
                });
            }
        } )   
 
    }else {
        next(); 
                
    }
};