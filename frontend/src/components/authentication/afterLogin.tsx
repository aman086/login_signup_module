import React from 'react';

interface SuccessfulLoginProps {
  username: string;
}

const SuccessfulLogin: React.FC<SuccessfulLoginProps> = ({ username }) => {
  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-md shadow-md text-white">
      <h2 className="text-3xl font-extrabold mb-6">Login Successful</h2>
      <p className="text-lg">Welcome, <span className="text-2xl">{username}</span>!</p>
      <p className="mt-4">You have successfully logged in.</p>
      <div className="mt-8 flex justify-center">
      </div>
    </div>
  );
};

export default SuccessfulLogin;
