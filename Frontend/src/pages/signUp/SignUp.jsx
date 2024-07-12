
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp as SignUpAction } from '../../actions/authActions';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector(state => state.authState);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);

    dispatch(SignUpAction(formData));

  };



  if (isAuthenticated) {
    navigate('/home');
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white flex justify-center items-center p-4 md:p-0 w-full">
        <div className='shadow-xl block p-6 md:p-10 rounded-xl w-full max-w-md'>
          <div className="flex">
            <h2 className='text-indigo-900 font-bold text-[35px]'>InSightHub</h2>
          </div>
          <p className='text-[24px] md:text-[25px] font-normal mb-4 md:mb-6 text-center md:text-left'>Welcome back !</p>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label htmlFor="name" className='text-[16px]'>Name</label>
              <div className='block'>
                <input
                  type="text"
                  id="name"
                  placeholder='Enter Your Name'
                  className='outline-none bg-[#e4ebf6] w-full h-10 p-4 rounded-md'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className='text-[16px]'>Email</label>
              <div className='block'>
                <input
                  type="text"
                  id="email"
                  placeholder='Enter Your Email'
                  className='outline-none bg-[#e4ebf6] w-full h-10 p-4 rounded-md'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className='mt-4'>
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-[16px]">Password</label>
              </div>
              <div className='block'>
                <input
                  type="password"
                  id="password"
                  placeholder='Enter Your Password'
                  className='bg-[#e4ebf6] outline-none w-full h-10 p-4 rounded-md'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className='flex justify-center items-center mt-6 mb-10'>
              <button type='submit' className='bg-indigo-900 rounded-lg text-white w-full md:w-[150px] h-[46px] hover:bg-[#c4bcb8]'>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
