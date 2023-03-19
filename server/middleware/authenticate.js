const jwt = require('jsonwebtoken');
const StudentsModel = require('../models/Students.js')


const authenticate = async (res, next, req) => {

    try {
        const token = req.cookie;
        console.log(token);
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        const rootUser = await StudentsModel.find({ _id: verifyToken._id, "tokens.token": token })
        if (!rootUser) {
            throw new Error(`Could not find ${token}`)
        }
        res.send("Authenticated user")
        // req.token = token;
        // req.rootUser = rootUser;
        // req.userID = rootUser._id;
        next();
    } catch (err) {
        // res.status(401).send("Unauthenticated. Please login again ")
        console.log(err);
    }
}

module.exports = authenticate;