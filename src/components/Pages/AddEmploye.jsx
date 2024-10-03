import React, { useState } from 'react';
import { db } from '../../firebase';
import { doc,setDoc } from 'firebase/firestore';

const AddEmploye = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [name, setName] = useState('');
  const [skills, setSkills] = useState([]);

  const handleSkillsChange = (e) => {
    const inputSkills = e.target.value;
    const skillsArray = inputSkills.split(',').map(skill => skill.trim());
    setSkills(skillsArray);
  };

  const handleSubmit = async() => {
    const data = {
      availability:true,
      name,
      skills,
      tasks:[],
      workload:0 
    }
    await setDoc(doc(db, "members", employeeId), data);
    console.log({
      employeeId,
      name,
      skills, 
    });
    alert("sucessfully added employee");
    window.location.reload()
   
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <section className="space-y-4">
        <input
          type="text"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
        />
        <input
          type="text"
          placeholder="Skills (comma separated)"
          onChange={handleSkillsChange}
          className="w-full border border-gray-300 rounded p-2"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Add employee
        </button>
      </section>
    </div>
  );
}

export default AddEmploye
