const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode.id) {
            req.user= tokenDecode;
        }else{
            return res.json({success: false, message: "Unauthorized, login again"})
        }
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};