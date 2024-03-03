// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [position, setPosition] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/employees')
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, position }),
      });
      const data = await response.json();
      setEmployees([...employees, data]);
      setName('');
      setAge('');
      setPosition('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>Employee Details</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <button type="submit">Add Employee</button>
      </form>
      <ul>
        {employees.map(employee => (
          <li key={employee._id}>
            <div>Name: {employee.name}</div>
            <div>Age: {employee.age}</div>
            <div>Position: {employee.position}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
