import { authUser, getUserProfile, logoutUser, registerUser, updateUser } from "../controllers/user.controller.js";
import express from 'express';
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post('/',registerUser);
router.post('/auth',authUser);
router.post('/logout',logoutUser);
router.route('/profile').get(authenticate, getUserProfile);
router.route('/update').put(authenticate, updateUser);






export default router;