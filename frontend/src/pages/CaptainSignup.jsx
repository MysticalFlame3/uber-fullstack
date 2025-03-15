import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainSignup = () => {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    if (!firstName || !lastName) {
      setError('First name and last name are required.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 3) {
      setError('Password must be at least 3 characters long.');
      return;
    }
    if (!vehicleColor || !vehiclePlate || !vehicleCapacity || !vehicleType) {
      setError('All vehicle details are required.');
      return;
    }

    const captainData = {
      fullname: { firstname: firstName, lastname: lastName },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );

      if (response.status === 201) {
        setCaptain(response.data.captain);
        localStorage.setItem('token', response.data.token);
        navigate('/captain-home');
      }
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src='https://www.svgrepo.com/show/505031/uber-driver.svg' alt='' />
        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>Captain's Name</h3>
          <div className='flex gap-4 mb-7'>
            <input className='input-field' type='text' placeholder='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <input className='input-field' type='text' placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>

          <h3 className='text-lg font-medium mb-2'>Email</h3>
          <input className='input-field' type='email' placeholder='email@example.com' value={email} onChange={(e) => setEmail(e.target.value)} required />

          <h3 className='text-lg font-medium mb-2'>Password</h3>
          <input className='input-field' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input className='input-field' type='text' placeholder='Vehicle Color' value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} required />
            <input className='input-field' type='text' placeholder='Vehicle Plate' value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)} required />
          </div>
          <div className='flex gap-4 mb-7'>
            <input className='input-field' type='number' placeholder='Vehicle Capacity' value={vehicleCapacity} onChange={(e) => setVehicleCapacity(e.target.value)} required />
            <select className='input-field' value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} required>
              <option value='' disabled>Select Vehicle Type</option>
              <option value='car'>Car</option>
              <option value='auto'>Auto</option>
              <option value='moto'>Moto</option>
            </select>
          </div>

          {error && <p className='text-red-500 mb-3'>{error}</p>}

          <button className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full'>Create Captain Account</button>
        </form>

        <p className='text-center'>Already have an account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
      </div>
    </div>
  );
};

export default CaptainSignup;
