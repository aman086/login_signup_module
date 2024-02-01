import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface LoginFormProps {
  onLogin: (name: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [username, setName] = useState<string | null>(null);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/login', { name , password });
      console.log(response);
      
      if (response.status === 200) {
        setName(name);
      } else {
        console.log("login failed")
      }


      // If successful, call the parent component's onLogin function
      onLogin(name, password);
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
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
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
          Login
        </button>
      </form>


      {username ? (
        // Render the SuccessMessage component after successful login
        <SuccessMessage username={username} />
      ) : (
        // Render the LoginForm component if not logged in
        <LoginForm onLogin={handleSubmit} />
      )}
    </div>
  );
};

export default LoginForm;
