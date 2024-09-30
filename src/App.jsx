import React from 'react';
import Login from './components/Login';
import { useAuthContext } from './useAuth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Manager from './components/dashboard/Manager';
import Layout from './components/Layout';
import LayoutEmp from './components/LayoutEmp';
import Employe from './components/dashboard/Employe'



const App = () => {
  const { employees, tasks } = useAuthContext();

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="admin" element={<Manager />}  ></Route>
          </Route>
          <Route element={<LayoutEmp />}>
            <Route path="employe" element={<Employe />}  ></Route>
          </Route>
          <Route path='*' element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
