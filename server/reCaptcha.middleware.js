const axios = require('axios');

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || 'Your secret key';

// reCaptcha verification middleware
module.exports = async (req, res, next) => {
  try {
    const params = {
      secret: RECAPTCHA_SECRET_KEY,
      response: req.body.captcha,
      remoteip: req.connection.remoteAddress, // optional
    };

    const { data } = await axios({
      method: 'post',
      url: 'https://www.google.com/recaptcha/api/siteverify',
      params,
    });

    if (data.success) {
      return next();
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
