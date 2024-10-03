import React from 'react';
import { useAuthContext } from '../../useAuth';

const ShowEmployees = () => {
  const { employees } = useAuthContext();

  return (
    <div className='flex flex-col justify-center items-center bg-gray-100 min-h-screen py-6'>
      <h1 className='text-3xl font-bold mb-6'>Employees Details</h1>
      <div className='flex flex-col justify-center items-center gap-4 w-full md:w-3/4 lg:w-1/2'>
        {employees.map(emp => {
          return (
            <div key={emp.id} className='bg-white rounded-lg shadow-lg max-w-md w-full p-5 transition-transform transform hover:scale-105'>
              <h2 className='text-xl font-semibold text-gray-800'>{emp.name}</h2>
              <p className='text-gray-600 mb-2'><strong>ID:</strong> {emp.id}</p>
              <ul className='list-disc list-inside mb-2'>
                <strong>Skills:</strong>
                {emp.skills?.map(skill => {
                  return (
                    <li key={emp.id + skill} className='text-gray-600'>{skill}</li>
                  );
                })}
              </ul>
              <p className='text-gray-600 mb-2'><strong>Availability:</strong> {emp.availability ? "✔️ Available" : "❌ Not Available"}</p>
              <p className='text-gray-600'><strong>Workload:</strong> {emp.workload}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowEmployees;
