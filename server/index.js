const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || '5000';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// reCaptcha verification middleware
const captchaMiddleware = async (req, res, next) => {
  try {
    const params = {
      secret: process.env.CAPTCHA_KEY || 'Your secret key',
      response: req.body.captcha,
      remoteip: req.connection.remoteAddress,
    };

    const { data } = await axios({
      method: 'post',
      url: 'https://www.google.com/recaptcha/api/siteverify',
      params,
    });

    if (data.success) {
      next();
    }
    return res.send({
      success: false,
      message: 'Registration failed! - reCaptcha verification failed',
    });
  } catch (error) {
    return res.send({
      success: false,
      message: 'Registration failed! - error while reCaptcha verification',
    });
  }
};

app.post('/api/register', captchaMiddleware, (req, res) => {
  res.send({ success: true, message: 'Successfully registered !' });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
