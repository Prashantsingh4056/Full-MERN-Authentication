const forgotPasswordTemplate = (username, otpCode, brandName = "AlgoTrack") => {
  return `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">

<style>

body{
    margin:0;
    padding:40px;
    background:#F3F4F6;
    font-family:Arial,sans-serif;
    -webkit-font-smoothing:antialiased;
}

.container{
    max-width:600px;
    margin:auto;
    background:#FFFFFF;
    border-radius:20px;
    overflow:hidden;
    border:1px solid #E5E7EB;
    box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);
}

.header{
    background:linear-gradient(135deg,#EF4444,#F59E0B);
    padding:35px;
    text-align:center;
}

.logo{
    color:#FFFFFF;
    font-size:34px;
    font-weight:bold;
}

.content{
    padding:40px;
    color:#374151;
}

h2{
    color:#111827;
    margin-top:0;
}

.otp-container {
    text-align:center;
    margin:30px 0;
}

.otp-box {
    display:inline-block;
    padding:15px 30px;
    background:#F3F4F6;
    border:2px dashed #D1D5DB;
    border-radius:12px;
    font-size:32px;
    font-weight:bold;
    letter-spacing:6px;
    color:#111827;
}

.footer{
    padding:25px;
    text-align:center;
    color:#6B7280;
    font-size:13px;
}

</style>

</head>

<body>

<div class="container">

<div class="header">
    <div class="logo">
        ${brandName}
    </div>
</div>

<div class="content">

<h2>Reset Your Password 🔑</h2>

<p>
Hello ${username},
</p>

<p>
We received a request to reset your password. Use the verification code below to complete your request:
</p>

<div class="otp-container">
    <div class="otp-box">
        ${otpCode}
    </div>
</div>

<p style="margin-top:35px; color:#6B7280;">
If you didn't request a password reset, please ignore this email or change your password immediately if you feel your security is at risk.
</p>

<p style="color:#EF4444; font-weight:600;">
This code expires in <strong>10 minutes</strong> and can only be used once.
</p>

</div>

<div class="footer">

© ${new Date().getFullYear()} ${brandName}

</div>

</div>

</body>

</html>
`;
};

export default forgotPasswordTemplate;
