import React from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { useAuthContext } from '../../useAuth';

const Nav = () => {
    const {setUser} = useAuthContext();
    const logout = ()=>{
        setUser(null);
        <Navigate to={'/'} replace></Navigate>
    }
  return (
    <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-800 p-4 shadow-lg">
      <div className="flex lg:gap-16 flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <NavLink 
          to="/admin/task" 
          className={({ isActive }) => 
            isActive 
              ? "text-blue-400 px-3 py-2 rounded-md text-sm font-medium" 
              : "text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium"
          }
        >
          Tasks
        </NavLink>
        <NavLink 
          to="/admin/newTask" 
          className={({ isActive }) => 
            isActive 
              ? "text-blue-400 px-3 py-2 rounded-md text-sm font-medium" 
              : "text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium"
          }
        >
          Add Task
        </NavLink>
        <NavLink 
          to="/admin/newEmploye" 
          className={({ isActive }) => 
            isActive 
              ? "text-blue-400 px-3 py-2 rounded-md text-sm font-medium" 
              : "text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium"
          }
        >
          Add Employee
        </NavLink>
        <NavLink 
          to="/admin/showEmployees" 
          className={({ isActive }) => 
            isActive 
              ? "text-blue-400 px-3 py-2 rounded-md text-sm font-medium" 
              : "text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium"
          }
        >
          show Employee
        </NavLink>
      </div>
      <button onClick={logout} className="mt-4 sm:mt-0 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
        Logout
      </button>
    </nav>
  );
};

export default Nav;
