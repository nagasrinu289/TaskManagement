// src/useAuth.jsx
import { collection, onSnapshot } from 'firebase/firestore';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from './firebase';
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [user,setUser] = useState("");

  useEffect(() => {
    // Listen for changes in the 'members' collection
    const unsubscribeEmployees = onSnapshot(collection(db, 'members'), (snapshot) => {
      const employeeData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEmployees(employeeData);
    }, (error) => {
      console.error("Error fetching employees:", error);
    });

    // Listen for changes in the 'tasks' collection
    const unsubscribeTasks = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const taskData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(taskData);
    }, (error) => {
      console.error("Error fetching tasks:", error);
    });

    // Cleanup listeners on unmount
    return () => {
      unsubscribeEmployees();
      unsubscribeTasks();
    };
  }, []);

  // Value to provide to all components
  const value = {
    employees,
    tasks,
    user,
    setUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
