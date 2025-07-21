import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/login', { email: Email, password: Password })
      .then((result) => {
        console.log('✅ Login Result:', result.data);
        if (result.data === 'Sucess') {
          navigate('/home');
        } else {
          alert(result.data);
        }
      })
      .catch((err) => console.error('❌ Login Error:', err));
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-dark vh-100'>
      <div
        className='bg-white p-4 rounded shadow-lg w-100'
        style={{ maxWidth: '400px' }}
      >
        <h2 className='text-center mb-4'>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group mb-3'>
            <label>
              <strong>Email</strong>
            </label>
            <input
              type='email'
              className='form-control'
              placeholder='Enter Email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group mb-4'>
            <label>
              <strong>Password</strong>
            </label>
            <input
              type='password'
              className='form-control'
              placeholder='Enter Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-primary w-100'>
            Login
          </button>
        </form>
        <p className='text-center mt-3 mb-0'>Don't have an account?</p>
        <Link to='/register' className='btn btn-outline-secondary w-100 mt-2'>
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
