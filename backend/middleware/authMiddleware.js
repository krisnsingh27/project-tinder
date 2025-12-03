
const User = require("../models/User")
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {

    let token = req.cookies.token;





    try {
        if (!token) {
            throw new Error("you are no authorized")
        }

        const { userId } = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(userId)
        //  console.log(user);
        req.user = user;
        next();

    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
