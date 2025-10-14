import React, { useEffect, useState } from 'react';

const Login = ({ setShowlogin }) => {
  const [state, setState] = useState('login');
  const [animating, setAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // form submission logic here
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFormToggle = (newState) => {
    if (newState === state) return;
    setAnimating(true);
    setTimeout(() => {
      setState(newState);
      setAnimating(false);
    }, 200); // 200ms matches the Tailwind transition duration
  };

  return (
    <div
      onClick={() => setShowlogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 "
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className={`flex flex-col gap-5 items-start p-8 py-10 w-80 sm:w-[352px]
          text-gray-600 bg-white rounded-lg shadow-xl border border-gray-200
          transform transition-all duration-300 ease-out
          ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
      >
        <h2 className="text-2xl font-semibold w-full text-center text-gray-800">
          <span className="text-primary">User</span> {state === 'login' ? 'Login' : 'Sign Up'}
        </h2>

        {/* Animate this section */}
        <div
          className={`w-full transition-all duration-300 ease-in-out transform 
            ${animating ? 'opacity-0 -translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'}
          `}
        >
          {state === 'register' && (
            <div className="w-full mb-4">
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border border-gray-300 rounded w-full p-2 outline-primary"
              />
            </div>
          )}

          <div className="w-full mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded w-full p-2 outline-primary"
            />
          </div>

          <div className="w-full mb-4">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded w-full p-2 outline-primary"
            />
          </div>

          <p className="text-sm mt-2 text-center">
            {state === 'register' ? (
              <>
                Already have an account?{' '}
                <span
                  onClick={() => handleFormToggle('login')}
                  className="text-primary cursor-pointer hover:underline"
                >
                  Click here
                </span>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <span
                  onClick={() => handleFormToggle('register')}
                  className="text-primary cursor-pointer hover:underline"
                >
                  Sign up
                </span>
              </>
            )}
          </p>

          <button
            type="submit"
            className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 mt-4 rounded-md"
          >
            {state === 'register' ? 'Create Account' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
