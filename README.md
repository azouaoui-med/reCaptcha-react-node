# ReCAPTCHA V2 With React and Node

A simple implementation of the google reCAPTCHA v2 using react for the client side and Node for the server side

> This example show how to use `< google reCAPTCHA v2 | I'm not a robot checkbox >` in a simple register form

## Installation

```
git clone https://github.com/azouaoui-med/reCaptcha-react-node.git
```

## Usage

First you need to get reCAPTCHA site and secret keys, see [Google reCAPTCHA](https://www.google.com/recaptcha/intro/v3.html)

- Server

  - cd into the server folder `cd server`
  - run `yarn` or `npm install`
  - open file in directory `server/reCaptcha.middleware.js`,you can add your secret key by updating the variable `RECAPTCHA_SITE_KEY`, or add it as an environement variable
  - start server by running `yarn start` or `npm start`

- Client

  - cd into the client folder `cd client`
  - run `yarn` or `npm install`
  - open file in directory `client/src/Recaptcha/Recaptcha.js` and add your site key by updating the variable `RECAPTCHA_SITE_KEY`
  - open file in directory `client/src/setupProxy.js` and make sure you have the correct server url `proxy({target: '< Your Server URL >', ...}]`
  - run `yarn start` or `npm start` to start the development server

## License

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/azouaoui-med/reCaptcha-react-node/blob/master/LICENSE)
