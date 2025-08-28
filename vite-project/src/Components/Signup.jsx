import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from 'react-router';

const Signup = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    function submitForm(value) {
        console.log(value);
        const data = {...value}
        delete data ['confirmPassword']
        sendData(data)
    }
    async function sendData(data) {
      try {
        const response = await axios.post('http://localhost:3000/user', data);
        console.log(response);
        toast.success('User created successfully!');
      } catch (error) {
        toast.error(error?.response?.data?.message || 'User creation failed');
      }
    };
     
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit((value) => submitForm(value))} className="space-y-4">
      <ToastContainer/>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            {...register('name', { required: "name is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your name" id='name'
          />
          {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
           type='text'
            name="address"
            {...register('address', { required: "address is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your address" id='address'
          />
          {errors.address && <p className='text-red-500 text-sm'>{errors.address.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
          <input
            type='text'
            name="contact"
            {...register('contact', { required: "contact is required"})}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your contact number" id='contact'
          />
          {errors.contact && <p className='text-red-500 text-sm'>{errors.contact.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            {...register('password', { required: "Password is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password" id='password'
          />
          {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
           type="password"
           name='confirmPassword'
           {...register('confirmPassword', {
             required: 'Confirm Password is required',
             validate: (value) => {
              if (value !== getValues("password")) {
                return "Passwords do not match";
              }
            },
           })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Confirm your password" id='confirmPassword'
          />
          {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>}
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </div>
        <div>
        <p className='mt-[10px] '>Already have an account ?
            <NavLink to={'/login'}>
            <span className='underline text-purple-600 font-semibold ' href="#">Login</span>
                </NavLink> </p>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Signup;