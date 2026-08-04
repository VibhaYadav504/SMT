const otpTemplate = (otp, name) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
</head>

<body style="font-family:Arial,sans-serif;background:#f6f6f6;padding:30px">

<div style="max-width:600px;margin:auto;background:#fff;border-radius:10px;padding:30px">

<h2 style="color:#f97316">
Skill Manthan
</h2>

<p>Hello <b>${name}</b>,</p>

<p>
Use the following OTP to reset your password.
</p>

<div
style="
font-size:34px;
font-weight:bold;
letter-spacing:8px;
text-align:center;
padding:20px;
background:#fff7ed;
border-radius:10px;
color:#ea580c;
margin:25px 0;
">

${otp}

</div>

<p>
This OTP is valid for 10 minutes.
</p>

<p>
If you didn't request this,
please ignore this email.
</p>

</div>

</body>
</html>
`;

export default otpTemplate;