import React, { useState } from 'react';
import { useAuthContext } from '../useAuth';
import { Navigate } from 'react-router-dom';
const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { employees, setUser,user } = useAuthContext(); 
  const[redirect,setRedirect] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== 'Task123') {
      alert("Incorrect password!");
      return;
    }
    const userExists = employees.filter(employee => employee.id === userName);
    console.log(userExists)
    if (!(userExists.length===1)) {
      alert("User not Found");
      return;
    }
    else if(userName === "manager"){
      setUser(userExists[0]);
      setRedirect('admin');
    }else{
      setUser(userExists[0]);
      setRedirect('employe');
    }
    
  };

  if(redirect){
    console.log(user);
    return <Navigate to={redirect} replace />
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
