import React, { useState } from 'react';
import { useAuthContext } from '../../useAuth';
import axios from 'axios';
import { doc,setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const AddTask = () => {
  const [deadline, setDeadline] = useState(null);
  const [description, setDescription] = useState("");
  const [taskId,setTaskId] = useState("");
  const { employees } = useAuthContext();  

  const clicked = async () => {
    if (!description || !deadline) {
      alert("Please fill in both description and deadline.");
      return;
    }
  
    const ActualEMP = employees.filter(item => item.id !== "manager");
    const employeeDetails = ActualEMP.map(emp => {
      const { id, name, skills, availability } = emp;
      return `Employee ID: ${id}, Name: ${name}, Skills: ${skills.join(', ')}, Availability: ${availability}`;
    }).join('\n');
  
    const taskDetails = `Task Description: ${description}, Task Deadline: ${deadline}`;
    const prompt = `Read the employee details and task details and assign the task to the employee ID whom it suits best only give employee id as response. \n\nEmployee Details:\n${employeeDetails}\n\nTask Details:\n${taskDetails}`;
  
    try {
      const res = await axios({
        url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBtJjGyf7yJfPtwUqt5gPw37zN72UO0R28",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          "contents":[{"parts":[{"text":prompt}]}]
        }
      });
  
      console.log("API Response:", res.data);
      console.log("API Response:", res.data.candidates[0].content.parts[0].text);
      await setDoc(doc(db,"tasks",taskId),{
        "assignedTo":res.data.candidates[0].content.parts[0].text,deadline,description,"status":"pending"});
      alert("Task successfully processed. Check console for details.");
    } catch (error) {
      console.error("API Error:", error.response?.data || error);
      alert("Error in assigning task. Check console for details.");
    }
  };
  

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-100'>
      <div className='bg-white shadow-md rounded-lg p-8 max-w-md w-full'>
        <h1 className='text-2xl font-bold mb-6 text-gray-800 text-center'>Add New Task</h1>
        <textarea 
          name="description" 
          placeholder='Enter task description...' 
          className='w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          onChange={e => setDescription(e.target.value)}
        ></textarea>
        <input
          name="description" 
          placeholder='Enter task Id' 
          className='w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          onChange={e => setTaskId(e.target.value)}
        ></input>
        <input 
          type="date" 
          name="deadline" 
          placeholder='deadline'
          className='w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          onChange={e => setDeadline(e.target.value)} 
        />
        <button 
          className='w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out'
          onClick={clicked}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTask;
