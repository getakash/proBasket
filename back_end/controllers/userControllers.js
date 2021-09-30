import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import mongoose from 'mongoose'
import generateToken from '../utilities/generateToken.js'

const getUser = asyncHandler(
    async (req,res) => {
        const {email, password} = req.body
        // console.log(req.body)
        const user = await User.findOne({email: email})

        if(user && (await user.matchPassword(password))){
            res.json({
                id: user._id,
                email: user.email,
                name: user.name,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        }else{
            res.status(401)
            throw new Error('Wrong username or password')
        }
    }
)

const registerNewUser = asyncHandler(
    async (req,res) => {
        const {name, email, password} = req.body

        const existUser = await User.findOne({email: email})

        if(existUser){
            res.status(400)
            throw new Error('User already exists')
        }

        const user = await User.create({
            name,
            email,
            password
        })

        if(user){
            res.status(201).json({
                id: user._id,
                email: user.email,
                name: user.name,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        }else{
            res.status(400)
            throw new Error('Invalid user data')
        }
    }
)

const getUserProfile = asyncHandler(
    async(req,res) => {
        // res.json({
        //     id: req.user._id,
        //     email: req.user.email,
        //     name: req.user.name,
        //     isAdmin: req.user.isAdmin,
        // })
        // const _id = new mongoose.Types.ObjectId(req.user._id)
        const {_id} = req.user._id
        const user = await User.findById(_id)

        if (user) {
            return  res.status(200).json({
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            })
            
        } else {
            res.status(404)
            throw new Error('User not found')
        }
    }
)
const updateUserProfile = asyncHandler(
    async (req,res) => {
        const user = await User.findById(req.user._id)

        // res.send(req.user._id)
        if(user){
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            if(req.body.password){
                user.password = req.body.password
            }
            
            const updatedUser = await user.save()

            res.json({
                id: updatedUser._id,
                email: updatedUser.email,
                name: updatedUser.name,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id)
            })
        }else {
            res.status(404)
            throw new Error('User not found')
        }
    }
)

export {getUser,registerNewUser, getUserProfile, updateUserProfile}