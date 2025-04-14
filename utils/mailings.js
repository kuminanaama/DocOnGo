import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service : "gmail",
    port : 587 ,
    secure : false,
    auth : {
        user : process.env.USER_EMAIL,
        pass : process.env.EMAIL_PASSWORD
    },
})


export const senderVerificationEmail = async (to, verificationCode , username) => {
    const mailOptions = {
        from : `"DocOnGo" <${process.env.USER_EMAIL}>`,
        to:to,
        subject: "EmailVerification",
        html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Verification</title>
</head>
<body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#ffffff; color:#333;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="border:1px solid #e0e0e0; border-radius:8px; overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color:#29AB87; padding: 20px; text-align:center; color:#ffffff;">
              <h1 style="margin:0; font-size:24px;">Verify Your Email</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; background-color:#ffffff;">
              <p style="font-size:16px; margin:0 0 20px;">Hello ${username},</p>
              <p style="font-size:16px; margin:0 0 20px;">
                Use the verification code below to confirm your email address:
              </p>

              <div style="background-color:#f8f8f8; border:1px dashed #29AB87; border-radius:6px; text-align:center; padding:20px; font-size:24px; font-weight:bold; color:#29AB87; letter-spacing:4px; margin:20px 0;">
               ${verificationCode}
              </div>

              <p style="font-size:14px; color:#555;">If you didn’t request this, you can safely ignore this email.</p>
              <p style="font-size:14px; color:#555;">Thanks,<br>DocOnGo</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f4f4f4; padding:15px; text-align:center; font-size:12px; color:#888;">
              &copy; 2025 Your Company. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
    }
   try {
     await transporter.sendMail(mailOptions);
     console.log("Verification email sent to:", to);
   } catch (error) {
    console.error("Error sending verification email:", error);
     throw new Error("Could not send verification email");
   }
}