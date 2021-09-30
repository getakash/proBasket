import express from 'express'
import { getUser, registerNewUser, getUserProfile, updateUserProfile } from '../controllers/userControllers.js'
import {Protect} from '../middlewares/authMW.js'

const router = express.Router()

router.route('/').post(registerNewUser);
router.route('/login').post(getUser);
router.route('/profile').get(Protect, getUserProfile);
router.route('/profile').put(Protect, updateUserProfile);

export default router