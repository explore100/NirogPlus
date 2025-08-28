import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  
  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:3000/login', data);
      console.log(res);
      toast.success('Login successful!');
      localStorage.setItem('token', res.data.token); // ✅ still needed
localStorage.setItem('user', JSON.stringify(res.data.data)); // ✅ store full user

      setTimeout(() => {
        const user = res.data.data;
        if (user.role === 'admin') {
          navigate("/DashBoard/admin"); // ✅ redirect to admin dashboard
        } else {
                  navigate("/DashBoard/Home");  // ✅ redirect to customer dashboard
        }
// ✅ redirect to dashboard
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer/>
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className='text-2xl font-bold text-center mb-6'>Login Form</h1>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <div>
          <label  className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            {...register('email', { required: "Email is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email" id='email'
          />
          {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm mt-[5px] font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            {...register('password', { required: "Password is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
            id='password'
          />
          {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </div>
        <div>
        <p className='mt-[10px] '>Don't have an account ?
            <NavLink to={'/SignUp'}>
            <span className='underline text-purple-600 font-semibold ' href="#">sign up</span>
                </NavLink> </p>
        </div>

        </form>
      </div>

    </div>
  )
}

export default Login