import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface SignUpFormProps {
  onSubmit: (name: string, password: string) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('/api/signup', { name, password });
      console.log(response);
  
      // If successful, call the parent component's onSubmit function
      onSubmit(name, password);
    } catch (error: any) {
      console.error('Error:', error);
  
      if (axios.isAxiosError(error)) {
        console.error('Server responded with an error:', (error as AxiosError).response?.data);
        console.error('Status code:', (error as AxiosError).response?.status);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-4">
    {/* Input field for Name */}
    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
      Name
    </label>
    <input
      type="text"
      id="name"
      name="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="border-2 border-gray-300 rounded-md p-2 w-full"
      required
    />
  </div>
  <div className="mb-4">
    {/* Input field for Password */}
    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
      Password
    </label>
    <input
      type="password"
      id="password"
      name="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="border-2 border-gray-300 rounded-md p-2 w-full"
      required
    />
  </div>
  <button
    type="submit"
    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
  >
    Sign Up
  </button>
</form>

    </div>
  );
};

export default SignUpForm;
