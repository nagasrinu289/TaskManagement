import React from 'react';
import Login from './components/Login';
import { useAuthContext } from './useAuth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Manager from './components/dashboard/Manager';
import Layout from './components/Layout';
import LayoutEmp from './components/LayoutEmp';
import Employe from './components/dashboard/Employe'
import Nav from './components/dashboard/Nav';
import AddTask from './components/Pages/AddTask';
import AddEmploye from './components/Pages/AddEmploye';
import TaskPage from './components/Pages/TaskPage';
import ShowEmployes from './components/Pages/ShowEmployes';


const App = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <Router>
      {user?.id==='manager' && <Nav></Nav>}
        <Routes>
          <Route path="/" element={<ShowEmployes />} />
          <Route element={<Layout />}>
            <Route path="admin" element={<Manager />}  ></Route>
            <Route path='admin/newTask' element={<AddTask />} />
            <Route path='admin/newEmploye' element={<AddEmploye />} />
            <Route path='admin/task' element={<TaskPage />} />
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
