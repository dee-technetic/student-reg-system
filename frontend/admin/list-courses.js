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
     // document.getElementById('totalCourses').textContent= courses.length; 
  
      
      const tableBody = document.querySelector(".table tbody");  
      if (!tableBody) {  
        console.error("Table body element not found");  
        return; 
      }  
  
      
      tableBody.innerHTML = '';  
  
      
      const fragment = document.createDocumentFragment();  
  
      courses.forEach((course, index) => {  
        const row = document.createElement("tr");  
        row.innerHTML = `  
          <th scope="row">${index + 1}</th>  
          <td>${course.courseName}</td>  
          <td>${new Date(course.createdAt).toLocaleDateString()}</td>  
          <td>  
            <a href="#" class="btn btn-md btn-danger delete-button" data-course-id="${course._id}">  
              <i class="fas fa-trash"></i>  
            </a>  
          </td>  
        `;  
        fragment.appendChild(row);  
      });  
  
    
      tableBody.appendChild(fragment);  
  
      
      addDeleteEventListeners();  
  
    } catch (error) {  
      console.error("Error fetching courses:", error);  
    }  
  }  
  
  async function deleteCourse(courseId) {  
    const url = `http://localhost:5000/api/admin/delete-course/${courseId}`;  
  
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
  
      console.log(`Course with ID ${courseId} deleted successfully`);  
     
      getCourses();  
  
    } catch (error) {  
      console.error("Error deleting course:", error);  
    }  
  }  

  function addDeleteEventListeners() {  
    const deleteButtons = document.querySelectorAll('.delete-button');  
    deleteButtons.forEach(button => {  
      button.addEventListener('click', async (event) => {  
        event.preventDefault();  
        const courseId = button.getAttribute('data-course-id');  
        const confirmDelete = confirm("Are you sure you want to delete this course?");  
        if (confirmDelete) {  
          await deleteCourse(courseId);  
        }  
      });  
    });  
  }  
  
  
  getCourses();