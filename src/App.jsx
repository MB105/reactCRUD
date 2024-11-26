import './styles/App.css';
import StudentList from './components/StudentList';
import PersonForm from './components/PersonForm';
import { useState, useEffect } from 'react';
import { fetchData } from './utils/fetchData';


const blankStudent = {id: '', name: '', age: '', email: '', classes: [ ]};


function App() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const[studentToEdit, setStudentTOEdit] = useState(blankStudent);

  const STUDENTS_API = "http://localhost:3000/students";
  const CLASSES_API = "http://localhost:3000/classes";

  //Edit students

  function editStudent(student)
  {
    setStudentTOEdit(student)
  }

  function mutateStudent(student){
    if (student.id != ''){
      //PUT
      updateStudent(student)
    }else{
      //POST
      createStudent(student)
  }
  }

  function updateStudent(student){
    console.log ('update');
    fetchData(
      `${STUDENTS_API}/${student.id}`,
      (student)=>{
      setStudents(
        students.map((s)=>(s.id === student.id? {...student}: s ))
      );
  },
      'PUT',
      student
    );
  }

  function createStudent(student){
    console.log('create');
    fetchData(
      STUDENTS_API,
      (student)=> setStudents([...students,student]),
      'POST',
      student
    );
  }


  // Fetch students
  const getStudents = async () => {
    await fetchData(STUDENTS_API, setStudents);
  };

  // Fetch classes
  const getClasses = async () => {
    await fetchData(CLASSES_API, setClasses);
  };

  useEffect(() => {
    // Fetch both students and classes
    getStudents(); // This will automatically update the students state
    getClasses();  // This will automatically update the classes state
  }, []);

  return (
    <div>
      <h1>Person DB</h1>
      <PersonForm 
    blankStudent ={blankStudent}
    studentToEdit ={studentToEdit}
    mutateStudent={mutateStudent}
    classes={classes} 
      
      />
      <StudentList 
      students={students} 
      classes={classes} 
      editStudent ={editStudent}/>
     
    </div>
  );
}

export default App;

