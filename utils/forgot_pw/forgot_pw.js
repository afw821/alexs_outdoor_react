const { appUrl, deployedAppUrl } = require("../../urlConfig.json");
const jwt = require("jsonwebtoken");

exports.usePasswordHashToMakeToken = ({
  password: passwordHash,
  id: userId,
  createdAt,
}) => {
  const secret = passwordHash + "-" + createdAt;
  const token = jwt.sign({ userId }, secret, {
    expiresIn: 3600, // 1 hour
  });

  return token;
};

exports.getPasswordResetURL = (user, token) =>
  `${deployedAppUrl}/${user.id}/${token}`;

exports.resetPasswordTemplate = (user, url) => {
  const from = "afw821@gmail.com";
  const to = user.email;
  const subject = "Password Reset";
  const html = `
      <p>Hey ${user.name || user.email},</p>
      <p>We heard that you lost your password. Sorry about that!</p>
      <p>But don’t worry! You can use the following link to reset your password:</p>
      <a href=${url}>${url}</a>
      <p>If you don’t use this link within 1 hour, it will expire.</p>
      <p>Do something outside today! </p>
      <p>–Your friends at Al's Outdoor</p>
      `;

  return { from, to, subject, html };
};
