export const verificationEmail=`
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
    <div style="max-width:500px; margin:auto; background:#ffffff; padding:24px; border-radius:10px; text-align:center;">
      
      <h2 style="color:#16a34a; margin-bottom:10px;">Verify Your Email</h2>
      
      <p style="color:#333;">Hi {{name}},</p>
      <p style="color:#555;">Use the verification code below to complete your signup:</p>

      <div style="
        margin:20px 0;
        font-size:28px;
        font-weight:bold;
        letter-spacing:6px;
        color:#16a34a;
      ">
        {{code}}
      </div>

      <p style="color:#777; font-size:14px;">
        This code will expire soon. If you didn’t request this, you can ignore this email.
      </p>

    </div>
  </body>
</html>
`

export const welcomeEmail=`
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
    <div style="max-width:500px; margin:auto; background:#ffffff; padding:20px; border-radius:10px;">
      <h2 style="color:#16a34a;">Welcome 🎉</h2>
      <p>Hi {{name}},</p>
      <p>Your account has been successfully created.</p>
      <p>We’re excited to have you on board.</p>
    </div>
  </body>
</html>
`

export const forgotPasswordEmail=`
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
    <div style="max-width:500px; margin:auto; background:#ffffff; padding:20px; border-radius:10px;">
      <h2 style="color:#16a34a;">Reset Your Password</h2>
      <p>Hi {{name}},</p>
      <p>You requested to reset your password.</p>

      <a href="{{resetLink}}" 
         style="display:inline-block; padding:10px 20px; background:#16a34a; color:#fff; text-decoration:none; border-radius:5px;">
         Reset Password
      </a>

      <p style="margin-top:20px;">If you didn’t request this, ignore this email.</p>
    </div>
  </body>
</html>
`

export const passwordReset=`
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
    <div style="max-width:500px; margin:auto; background:#ffffff; padding:20px; border-radius:10px;">
      <h2 style="color:#16a34a;">Password Updated</h2>
      <p>Hi {{name}},</p>
      <p>Your password has been successfully changed.</p>
      <p>If this wasn’t you, please contact support immediately.</p>
    </div>
  </body>
</html>
`
