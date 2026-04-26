import { transporter } from "./transport.js"
import { verificationEmail, 
         welcomeEmail, 
         forgotPasswordEmail,
         passwordReset 
} from "./emailtemplates.js"


export const sendVerificationEmail = async (name, email, code) => {
   const html = verificationEmail
   .replace("{{name}}", name)
   .replace("{{code}}", code)
  try {
    const info = await transporter.sendMail({
      from: `"Auth App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify your email',
      html
    })
    console.log(`Email sent ${info}`)
  } catch (error) {
    console.log('Email error:', error.message)
  }
}

export const sendWelcomeEmail = async (name, email) => {
   const html = welcomeEmail
   .replace("{{name}}", name)
  try {
    const info = await transporter.sendMail({
      from: `"Auth App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome',
      html
    })
    console.log(`Email sent ${info}`)
  } catch (error) {
    console.log('Email error:', error.message)
  }
}

export const sendResetPasswordEmail = async (name, email, resetToken) => {
   const html = forgotPasswordEmail.replace("{{name}}", name).replace('{{resetLink}}', resetToken)
  try {
    await transporter.sendMail({
      from: `"Auth App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset Password',
      html
    })
  } catch (error) {
    console.log('Email error:', error)
  }
}

export const sendPasswordResetEmail = async (name, email) => {
   const html = passwordReset.replace("{{name}}", name)
  try {
    await transporter.sendMail({
      from: `"Auth App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password reset successfully',
      html
    })
  } catch (error) {
    console.log('Email error:', error)
  }
}