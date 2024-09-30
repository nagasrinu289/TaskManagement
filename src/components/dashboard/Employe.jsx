import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../useAuth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
const Employe = () => {
  const { user, tasks } = useAuthContext();
  const [employeTasks, setEmployeTasks] = useState([]);

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => user.tasks.includes(task.id));
    setEmployeTasks(filteredTasks);
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      // Reference to the task document in Firestore
      const taskRef = doc(db, "tasks", taskId);

      // Update the task's status in Firestore
      await updateDoc(taskRef, {
        status: newStatus,
      });

      // Optionally, update the local state to reflect the change immediately
      setEmployeTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );

      console.log(`Task ${taskId} updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Employee Dashboard</h1>
        <div className="mt-4 text-center">
          <p>
            Welcome, <strong>{user.name}</strong>!
          </p>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Your Tasks</h2>
          <ul className="list-disc list-inside">
            {employeTasks &&
              employeTasks.map((task) => {
                return (
                  <div
                    key={task.id}
                    className="flex flex-col gap-2 p-4 mb-4 border border-gray-200 rounded-lg bg-white shadow-lg"
                  >
                    <li className="text-lg font-medium text-gray-700">
                      {task.description}
                    </li>
                    <select
                      name="status"
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(task.id, e.target.value)
                      }
                      className="p-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="inprogress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                );
              })}
          </ul>
        </div>
        <div className="mt-6">
          <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Employe;
