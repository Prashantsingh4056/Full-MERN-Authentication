const verifyEmailTemplate = (username, verificationLink, brandName = "Our Platform") => {
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
    background:linear-gradient(135deg,#6D5DFC,#8B5CF6);
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

.button{
    display:inline-block;
    margin-top:25px;
    padding:14px 28px;
    background:#6D5DFC;
    color:#FFFFFF!important;
    text-decoration:none;
    border-radius:10px;
    font-weight:bold;
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

<h2>Welcome ${username} 👋</h2>

<p>
Thank you for creating your ${brandName} account.
</p>

<p>
Click the button below to verify your email address.
</p>

<a
href="${verificationLink}"
class="button">
Verify Email
</a>

<p style="margin-top:35px; color:#6B7280;">
If you didn't create this account, simply ignore this email.
</p>

<p style="color:#6B7280;">
This verification link expires in <strong>30 minutes</strong>.
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

export default verifyEmailTemplate;
