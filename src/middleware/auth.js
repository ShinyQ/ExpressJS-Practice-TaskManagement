const jwt = require('jsonwebtoken')
const User = require('../model/users')

const auth = async (req, res, next) => {
    try {
        console.log("endpoint")
        const token = req.header('Authorization').replace('Bearer ','')
        const verifyToken = jwt.verify(token, 'taskmanageuserjwt')
        const user = await User.findOne({ _id: verifyToken._id, 'tokens.token': token }) 
        console.log("endpoint")
        if (!user) {
            throw new Error()
        }

        req.user = user
        next()
    } catch (error) {
        res.status(401).send({ error: "Unauthorized" })
    }
}

module.exports = auth