import { displaySuccessMessage, displayErrorMessage } from './message.js'; 

async function getCourses() {
  const url = "http://localhost:5000/api/admin/list-courses";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Await the JSON parsing
    const data = await response.json();

    // Ensure the structure matches your API response
    const courses = data.data;
    console.log(courses);

    //Uncomment if you need to populate a select element
    const courseSelect = document.getElementById("course-select");
    courses.forEach((course) => {
      const option = document.createElement("option");
      option.value = course.courseName;
      option.text = course.courseName;
      courseSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
}

getCourses();

async function registerStudent(studentData) {  
    const url = "http://localhost:5000/api/student/register";  
    console.log("Data to be sent:", studentData); // Log the data before sending  
    try {  
        const response = await fetch(url, {  
            method: "POST",  
            headers: {  
                "Content-Type": "application/json",  
            },  
            body: JSON.stringify(studentData),  
        });  

        if (!response.ok) {  
            throw new Error(`HTTP error! status: ${response.status}`);  
        }  

        const data = await response.json();  

        if (data && data.data) {  
            const student = data.data;  
            console.log(student);  
            displaySuccessMessage("registeration successfull!");
            localStorage.setItem('registeredStudent', JSON.stringify(student));
            window.location.href = "login.html"; 
        } else {  
            console.error("Unexpected data structure:", data);  
            displayErrorMessage("details already exist.");
        }  

    } catch (error) {  
        console.error("Error registering student:", error);  
    }  
}  

document.addEventListener("DOMContentLoaded", function() {  
    document.getElementById("registeration").addEventListener("submit", function(event) {  
        event.preventDefault();   
        const studentData = {  
            fullname: document.getElementById("name").value,  
            email: document.getElementById("email").value,  
            course: document.getElementById("course-select").value,  
            password: document.getElementById("password").value, 
        };  

        registerStudent(studentData);   
    });  
});
