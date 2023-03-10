const jwt = require("jsonwebtoken");

const User = require("../models/userModels");

const authKontrol = async (req, res, next) => {
    
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ hata: "Yetkilendirme tokeni gerekli" });
    }
    
    // Bearer akmfwjpınmfkpnkgq =>  akmfwjpınmfkpnkgq

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findOne({_id}).select('_id');
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ hata: "İstek Yetkili Değil" });
    }
}

module.exports = authKontrol;