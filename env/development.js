var port = 1337;

module.exports = {
  port: port,
  db: 'mongodb://localhost/mean-auth-html',
  TOKEN_SECRET: process.env.TOKEN_SECRET
};