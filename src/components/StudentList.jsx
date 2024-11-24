function StudentList({ students, classes,editStudent }) {
  const getClassNames = (classIds) => {
    return classIds
      .map((id) => 
        classes.find((cls) => String(cls.id) === String(id))?.name || "Unknown"
      )
      .join(", ");
  };
  
    
  
    return (
      <div>
        <h1>List of Students</h1>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Classes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.email}</td>
                <td>{getClassNames(student.classes)}</td>
                <td>
                <button onClick={()=> editStudent(student)}>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default StudentList;
  