async function getStudents() {  
  const url = "http://localhost:5000/api/admin/list-students";   

  try {  
    const authToken = localStorage.getItem("authToken");
    console.log("Authentication token:", authToken);
    if (!authToken) {
      console.Error("Missing authentication token");
      return;
    }
    const response = await fetch(url, {  
      method: "GET",  
      headers: {  
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,  
      },  
    });  

    if (!response.ok) {  
      throw new Error(`API request failed with status ${response.status}`);  
    }  

    const data = await response.json();  
    console.log(data);  
    localStorage.setItem('studentList', JSON.stringify(data));  

    // Validate the response structure  
    if (!data.data || !Array.isArray(data.data)) {  
      throw new Error("Unexpected API response format");  
    }  

    const students = data.data;  
    console.log(students);  

    // document.getElementById("totalStudents").textContent = students.length;  
    
    const tableBody = document.querySelector(".table tbody");  
    if (!tableBody) {  
      console.error("Table body element not found");  
      return; 
    }  

    
    tableBody.innerHTML = '';  

    
    const fragment = document.createDocumentFragment();  

    students.forEach((student, index) => {  
      const row = document.createElement("tr");  
      row.innerHTML = `  
        <th scope="row">${index + 1}</th>  
        <td>${student.fullname}</td>  
        <td>${student.email}</td>  
        <td>  
          <a href="#" class="btn btn-md btn-danger delete-button" data-student-id="${student._id}">  
            <i class="fas fa-trash"></i>  
          </a>  
        </td>  
      `;  
      fragment.appendChild(row);  
    });  

  
    tableBody.appendChild(fragment);  

    
    addDeleteEventListeners();  

  } catch (error) {  
    console.error("Error fetching students:", error);  
  }  
}  

async function deleteStudent(studentId) {  
  const url = `http://localhost:5000/api/admin/delete-student/${studentId}`;  

  try {  
      const authToken = localStorage.getItem("authToken");
    console.log("Authentication token:", authToken);
    if (!authToken) {
      console.Error("Missing authentication token");
      return;
    }
    const response = await fetch(url, {  
      method: "DELETE",  
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
    });  

    if (!response.ok) {  
      throw new Error(`Delete request failed with status ${response.status}`);  
    }  

    console.log(`Student with ID ${studentId} deleted successfully`);  
   
    getStudents();  

  } catch (error) {  
    console.error("Error deleting student:", error);  
  }  
}  

function addDeleteEventListeners() {  
  const deleteButtons = document.querySelectorAll('.delete-button');  
  deleteButtons.forEach(button => {  
    button.addEventListener('click', async (event) => {  
      event.preventDefault();  
      const studentId = button.getAttribute('data-student-id');  
      const confirmDelete = confirm("Are you sure you want to delete this student?");  
      if (confirmDelete) {  
        await deleteStudent(studentId);  
      }  
    });  
  });  
}  


getStudents();