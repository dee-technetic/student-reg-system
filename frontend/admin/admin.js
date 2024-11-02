document.addEventListener("DOMContentLoaded", function() {
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');

  sidebarToggle.addEventListener('click', function () {
    sidebar.classList.toggle('active');
  });

  
})

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
    
     document.getElementById("totalStudents").textContent = students.length;  
    
   
    
    addDeleteEventListeners();  

  } catch (error) {  
    console.error("Error fetching students:", error);  
  }  
}  

getStudents()


async function getCourses() {  
  const url = "http://localhost:5000/api/admin/list-courses";   

  try {  
    const response = await fetch(url, {  
      method: "GET",  
      headers: {  
        "Content-Type": "application/json"  
      },  
    });  

    if (!response.ok) {  
      throw new Error(`API request failed with status ${response.status}`);  
    }  

    const data = await response.json();  
    console.log(data);  
    localStorage.setItem('courseList', JSON.stringify(data));  
    
    // Validate the response structure  
    if (!data.data || !Array.isArray(data.data)) {  
      throw new Error("Unexpected API response format");  
    }  

    const courses = data.data;  
    console.log(courses);  
   document.getElementById('totalCourses').textContent= courses.length; 

    
    
    
    addDeleteEventListeners();  

  } catch (error) {  
    console.error("Error fetching courses:", error);  
  }  
}  

getCourses()



function logout() {
  localStorage.removeItem('registeredadmin');
  localStorage.removeItem('studentList'); // Clear student list on logout
  location.reload();
}