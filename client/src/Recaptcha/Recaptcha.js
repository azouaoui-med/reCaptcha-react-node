import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

const Recaptcha = () => {
  const [captcha, setCaptcha] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');
  const [registerResponse, setRegisterResponse] = useState('');

  const handleCaptchaChange = (value) => {
    setCaptcha(value);
  };

  const handleSubmit = async (e) => {
    setRegisterStatus('pending');
    e.preventDefault();
    e.persist();
    if (captcha) {
      const payload = {
        username: e.target.firstName.value,
        email: e.target.lastName.value,
        captcha,
      };
      try {
        const { data } = await axios.post('/api/register', payload);
        if (data.success) {
          setRegisterStatus('success');
        } else {
          setRegisterStatus('error');
        }
        setRegisterResponse(data.message);
      } catch (error) {
        console.log(error);
        setRegisterStatus('error');
        setRegisterResponse('Error while registering!');
      }
    } else {
      setRegisterStatus('error');
      setRegisterResponse('Please select captcha');
      console.log('captcha not verified');
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      <div>
        <h2 className='text-center'>Emplementing</h2>
        <h4 className='mb-5 text-center'> google reCAPTCHA v2</h4>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              required
              name='firstName'
              type='text'
              className='form-control'
              placeholder='Enter first name'
            />
          </div>
          <div className='form-group'>
            <input
              required
              name='lastName'
              type='text'
              className='form-control'
              placeholder='Enter last name'
            />
          </div>
          <div className='form-group'>
            <ReCAPTCHA
              sitekey='Your client site key'
              onChange={handleCaptchaChange}
            />
          </div>
          <div className='form-group'>
            <button
              type='submit'
              className='btn btn-block btn-primary'
              disabled={registerStatus === 'pending'}
            >
              {registerStatus === 'pending' ? 'Submitting form ...' : 'Submit'}
            </button>
          </div>
          <div className='form-group'>
            {registerResponse !== '' ? (
              <div
                className={`alert ${
                  registerStatus === 'success'
                    ? 'alert-success'
                    : 'alert-danger'
                }`}
                role='alert'
              >
                {registerResponse}
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Recaptcha;
