const jwt = require("jsonwebtoken");

const Admin = require("../models/adminModels");

const authKontrol = async (req, res, next) => {
    
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ hata: "Yetkilendirme tokeni gerekli" });
    }
    
    // Bearer akmfwjpınmfkpnkgq =>  akmfwjpınmfkpnkgq

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await Admin.findOne({_id}).select('_id');
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ hata: "İstek Yetkili Değil" });
    }
}

module.exports = authKontrol;