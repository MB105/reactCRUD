import { useEffect, useState } from "react";

function PersonForm({blankStudent,studentToEdit, mutateStudent, classes}) {
const [student,setStudent]= useState({... studentToEdit})

useEffect(()=>{
  setStudent(studentToEdit);
}, [studentToEdit]);

function handleChange(event) {
  const value = event.target.value;
  const name = event.target.id;

  // Check if the changed field is the 'classes' select field (multiple selection)
  if (name === "classes") {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => parseInt(option.value, 10));
    setStudent({ ...student, [name]: selectedValues }); // Update student.classes with selected class IDs
  } else {
    // Handle regular fields (name, age, email, etc.)
    setStudent({ ...student, [name]: value });
  }
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
  <label htmlFor="classes">Classes</label>
        <select
          id="classes"
          multiple
          value={student.classes}
          onChange={handleChange}
        >
          {/* Dynamically generate options based on classes */}
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name} - {cls.teacher} {/* Show class name and teacher */}
            </option>
          ))}
        </select>
  <button>Add</button>

  </form>
  <button  onClick={()=> setStudent(blankStudent)}>Reset</button>
  
  


    </div>
    );
    
}


export default PersonForm;
