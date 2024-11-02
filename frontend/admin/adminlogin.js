import { displaySuccessMessage, displayErrorMessage } from '../message.js';  


export async function loginAdmin(adminData) {  
    const url = "http://localhost:5000/api/admin/login";  
    console.log("Data to be sent:", adminData);  

    try {  
        const response = await fetch(url, {  
            method: "POST",  
            headers: {  
                "Content-Type": "application/json",  
            },  
            body: JSON.stringify(adminData),  
        });  

        if (!response.ok) {  
            throw new Error(`HTTP error! status: ${response.status}`);  
        }  

        const data = await response.json();  

        // Check if admin data exists correctly  
        if (data && data.status === 'success' && data.adminData) {  
            const admin = data.adminData;  
            console.log(admin.authToken);
            localStorage.setItem("authToken", admin.authToken);
            console.log("Logged in admin:", admin);  
            displaySuccessMessage("Login successful!");  
            localStorage.setItem('loggedInadmin', JSON.stringify(admin));  
             window.location.href = "admindash.html";  
             
        } else {  
            console.error("Unexpected data structure:", data);  
            displayErrorMessage("Invalid email or password.");   
        }  

    } catch (error) {  
        console.error("Error logging in admin:", error);  
        displayErrorMessage("An error occurred during login.");  
    }  
}

document.getElementById("loginForm").addEventListener("submit", function(event) {  
    event.preventDefault();   
    const adminData = {   
        email: document.getElementById("email").value,  
        password: document.getElementById("password").value,   
    };  

    loginAdmin(adminData);   
});  