import { useEffect, useState } from "react";

function PersonForm({blankStudent,studentToEdit, mutateStudent}) {
const [student,setStudent]= useState({... studentToEdit})

useEffect(()=>{
  setStudent(studentToEdit);
}, [studentToEdit]);

function handleChange(event)
{
  const value = event.target.value;
  const name = event.target.id;
  setStudent({...student, [name]: value});
}

function handleSubmit(event){
  event.preventDefault();
  console.log('submit',student);
  mutateStudent(student);
}

    return (<div>
        <h1>Add/Edit person</h1>
        <form onSubmit={handleSubmit}>
  <label htmlFor="id">Id</label>
  <input id="id" type="number" readOnly placeholder="id" value = {student.id} onChange ={handleChange}/>
  <label htmlFor="name">Name</label>
  <input id="name" type="text" placeholder="Enter name" value = {student.name} onChange ={handleChange}/>
  <label htmlFor="age">Age</label>
  <input id="age" type="number" min="1" max="120" placeholder="Enter age" value = {student.age} onChange ={handleChange}/>
  <label htmlFor="email">Email</label>
  <input id="email" type="email" placeholder="Enter email" value = {student.email} onChange ={handleChange} />
  <label htmlFor="class">Class</label>
  <select id="class" value = {student.classes} onChange ={handleChange}>
    <option value="Math 101">Math 101</option>
    <option value="History 201">History 201</option>
  </select>
  <button>Add</button>
  <button onClick={()=> setStudent(blankStudent)}>Reset</button>
  
  
</form>

    </div>
    );
    
}


export default PersonForm;