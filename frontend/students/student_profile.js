async function getCourses() {  
  const url = "http://localhost:5000/api/admin/list-courses";  
  try {  
    const response = await fetch(url, {  
      method: "GET",  
      headers: {  
        "Content-Type": "application/json",  
      },  
    });  

    const data = await response.json();  
    const courses = data.data;  
    console.log(courses);  

    // Uncomment if you need to populate a select element  
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

let studentData; // Define studentData in a higher scope  

export async function fetchStudentDetails(studentId) {  
  const url = `http://localhost:5000/api/admin/get-student/${studentId}`;  
  try {  
    const response = await fetch(url);  
    if (!response.ok) {  
      throw new Error(`Error fetching student details: ${response.status}`);  
    }  

    const data = await response.json();  
    if (data && data.status === 'success' && data.studentData) {  
      studentData = data.studentData; 
      updateStudentDetails(studentData);  
      populateFormFields(studentData);  
    } else {  
      console.error("Unexpected data structure:", data);  
      displayErrorMessage("Failed to retrieve student details.");  
    }  
  } catch (error) {  
    console.error("Error fetching student details:", error);  
    displayErrorMessage("An error occurred while fetching student details.");  
  }  
}  

function populateFormFields(studentsData) {  
  document.getElementById('fullname').value = studentsData.fullname;  
  document.getElementById('age').value = studentsData.age;  
  document.getElementById('email').value = studentsData.email;  

  const genderSelect = document.getElementById('main-gender');  
  genderSelect.value = studentsData.gender;  

  const courseSelect = document.getElementById('course-select');  
  courseSelect.value = studentsData.course;  

  // Attach the event listener here after populating the form  
  document.getElementById('updateStudent').addEventListener('submit', (event) => {  
    event.preventDefault();  
    updateStudentDetails(studentsData.id);  
  });  
}  

async function updateStudentDetails(studentId) {  
  const updatedData = {  
    fullname: document.getElementById('fullname').value,  
    age: document.getElementById('age').value,  
    email: document.getElementById('email').value,  
    gender: document.getElementById('main-gender').value,  
    course: document.getElementById('course-select').value,  
  };  

  const url = `http://localhost:5000/api/student/update/${studentId}`;  

  try {  
    const response = await fetch(url, {  
      method: "PATCH",  
      headers: {  
        "Content-Type": "application/json",  
      },  
      body: JSON.stringify(updatedData),  
    });  

    if (!response.ok) {  
      throw new Error(`HTTP error! status: ${response.status}`);  
    }  

    const data = await response.json();  
    if (data.status === 'success') {  
      displaySuccessMessage("Student details updated successfully!");  
      localStorage.setItem('registeredStudent', JSON.stringify(updatedData));  
      window.location.href = 'studentdash.html';  
    } else {  
      displayErrorMessage("Failed to update student details.");  
    }  
  } catch (error) {  
    console.error("Error updating student details:", error);  
    displayErrorMessage("An error occurred while updating student details.");  
  }  
}