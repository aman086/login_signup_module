import React, { useState } from 'react';
import SignUpForm from './components/authentication/Signup';
import LoginForm from './components/authentication/Login';

function App() {
  const [activeComponent, setActiveComponent] = useState<number | null>(null);

  const handleClick = (componentNumber: number) => {
    setActiveComponent((prevActiveComponent) =>
      prevActiveComponent === componentNumber ? null : componentNumber
    );
  };

  const handleSignUp = (name: string, password: string) => {
    console.log(`Signing up ${name} with password ${password}`);
  };

  const handleLogin = (username: string, password: string) => {
    console.log(`Logging in with username ${username} and password ${password}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2>Let's start making our application and this is our first App</h2>
        <button onClick={() => handleClick(1)}>Register Here</button>
        <button onClick={() => handleClick(2)}>Login Here</button>

        {activeComponent === 1 && <SignUpForm onSubmit={handleSignUp} />}
        {activeComponent === 2 && <LoginForm onSubmit={handleLogin} />}
      </div>
    </div>
  );
}

export default App;
