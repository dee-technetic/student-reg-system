import { displaySuccessMessage, displayErrorMessage } from './message.js';   
import { fetchStudentDetails } from './students/student_profile.js';

export async function loginStudent(studentData) {  
    const url = "http://localhost:5000/api/student/login";  
    console.log("Data to be sent:", studentData);  

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

        // Check if student data exists correctly  
        if (data && data.status === 'success' && data.studentData) {  
            const student = data.studentData;  
            console.log("Logged in student:", student);  
            displaySuccessMessage("Login successful!");  
            localStorage.setItem('loggedInStudent', JSON.stringify(student));

            // Fetch the student details  
            fetchStudentDetails(student.id); 

            // Redirect to student dashboard page
            window.location.href = "students/studentdash.html";
             
        } else {  
            console.error("Unexpected data structure:", data);  
            displayErrorMessage("Invalid email or password.");   
        }  

    } catch (error) {  
        console.error("Error logging in student:", error);  
        displayErrorMessage("An error occurred during login.");  
    }  
}  

// Event listener for the form submission  
document.addEventListener("DOMContentLoaded", function() {  
    document.getElementById("login").addEventListener("submit", function(event) {  
        event.preventDefault();   
        const studentData = {   
            email: document.getElementById("email").value,  
            password: document.getElementById("password").value, 
        };  

        loginStudent(studentData);   
    });  
});