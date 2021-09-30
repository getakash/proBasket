import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const Protect = asyncHandler(async(req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.USER_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            next()
        }catch(err){
            res.status(401)
            throw new Error('Unauthorised, Token Failed')

        }
    }

    if(!token){
        res.status(401)
            throw new Error('Unauthorised, No Token')
        return
    }
    

    // next()
})

export {Protect};