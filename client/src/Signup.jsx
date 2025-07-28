import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (!Name || !Email || !Password) {
      alert('Please fill all fields');
      return;
    }

    e.preventDefault();
    axios
      .post('http://localhost:3001/register', {
        name: Name,
        email: Email,
        password: Password,
      })
      .then((result) => {
        console.log('✅ User Registered:', result.data);
        navigate('/login');
      })
      .catch((err) => console.error('❌ Error:', err));
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-dark vh-100'>
      <div
        className='bg-white p-4 rounded shadow-lg w-100'
        style={{ maxWidth: '400px' }}
      >
        <h2 className='text-center mb-4'>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control mb-3'
              placeholder='Enter Name'
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type='email'
              className='form-control mb-3'
              placeholder='Enter Email'
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type='password'
              className='form-control mb-3'
              placeholder='Enter Password'
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-success w-100'>
            Register
          </button>
        </form>
        <p className='text-center mt-3 mb-0'>Already have an account?</p>
        <Link to='/login' className='btn btn-outline-secondary w-100 mt-2'>
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
