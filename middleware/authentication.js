const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(200).json({
            success:false,
        });
    }
    jwt.verify(token,process.env.TOKEN_SECRET, (error, payload) => {
        if(error){
            return res.status(200).json({
                success:false,
            });
        }
        req.payload = payload;
        next();
    });
}

module.exports = authenticateToken;