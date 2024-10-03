import React, { useState } from 'react';
import { useAuthContext } from '../../useAuth';
import { doc, updateDoc, arrayUnion, increment, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase';

const TaskPage = () => {
  const { tasks } = useAuthContext();
  const [modify, setModify] = useState(false);
  const [assignedTo, setAssignedTo] = useState("");
  const [deadline, setDeadline] = useState(""); 
  const [taskId, setTaskId] = useState("");
  const [emp, setEmp] = useState(""); 

  if (!tasks) {
    return <div className="text-center text-gray-500">Loading tasks...</div>;
  }

  if (tasks.length === 0) {
    return <div className="text-center text-gray-500">No tasks available.</div>;
  }

  const handleModify = async (taskId) => {
    try {
      const taskRef = doc(db, "tasks", taskId); 
      const oldEmpDocRef = doc(db, "members", emp); 
      const newEmpDocRef = doc(db, "members", assignedTo); 

      if (!emp || !assignedTo) {
        alert("Invalid employee ID");
        return;
      }

      await updateDoc(newEmpDocRef, {
        tasks: arrayUnion(taskId), 
        workload: increment(1),    
      });

      // Remove task from the old employee
      await updateDoc(oldEmpDocRef, {
        tasks: arrayRemove(taskId), 
        workload: increment(-1),    
      });

      // Update the task document with the new assigned employee 
      await updateDoc(taskRef, {
        assignedTo: assignedTo,
        deadline: deadline || "", 
      });

      setModify(false); 
      alert("Successfully updated the task and employee records.");
    } catch (error) {
      console.error("Error updating task or employee document: ", error);
    }
  };

  const handleModifyClick = (task) => {
    setModify(true);
    setTaskId(task.id); 
    setAssignedTo(task.assignedTo || ""); 
    setDeadline(task.deadline || ""); 
    setEmp(task.assignedTo); 
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {modify && (
        <div className="mb-4">
          <label className="block mb-2">Assigned To (Employee ID):</label>
          <input
            className="border p-2 rounded w-full mb-4"
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
          <label className="block mb-2">Deadline:</label>
          <input
            className="border p-2 rounded w-full mb-4"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <button
            onClick={() => handleModify(taskId)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </div>
      )}

      {tasks.map((task) => (
        <div
          key={task.id}
          className="border border-gray-300 rounded-lg shadow-md p-4 mb-4"
        >
          <h3 className="text-lg font-semibold text-gray-800">Task ID: {task.id}</h3>
          <p className="text-gray-600"><span className="font-medium">Assigned to (Employee ID):</span> {task.assignedTo}</p>
          <p className="text-gray-600"><span className="font-medium">Status:</span> {task.status}</p>
          <p className="text-gray-600"><span className="font-medium">Description:</span> {task.description}</p>
          <p className="text-gray-600"><span className="font-medium">Deadline:</span> {task.deadline || "N/A"}</p>
          <button
            onClick={() => handleModifyClick(task)}
            className="bg-yellow-500 text-white px-4 py-2 mt-4 rounded"
          >
            Modify
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskPage;
