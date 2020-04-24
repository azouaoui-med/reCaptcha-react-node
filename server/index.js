const express = require('express');
const bodyParser = require('body-parser');
const reCaptchaMiddleware = require('./reCaptcha.middleware');

const app = express();
const PORT = process.env.PORT || '5000';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/register', reCaptchaMiddleware, (req, res) => {
  return res.send({ success: true, message: 'Successfully registered !' });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
