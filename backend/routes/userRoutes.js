import express from 'express'
import { signupController, 
         verifyEmailController,
         loginController,
         logoutController,
         forgotPasswordController,
         resetPasswordController,
         dashboardController
} from '../Controllers/userControllers.js'
const router = express.Router()
import { protect } from '../middleware/protect.js'

router.post('/signup', signupController)
router.post('/verify-email', verifyEmailController)
router.post('/login', loginController)
router.post('/logout', logoutController)
router.post('/forgot-password', forgotPasswordController)
router.post('/reset-password', resetPasswordController)
router.get('/dashboard', protect, dashboardController)

export default router