
async function registerAdmin(adminData) {  
    const url = "http://localhost:5000/api/admin/register";  
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

        if (data && data.data) {  
            const admin = data.data;  
            console.log(admin);  
            localStorage.setItem('registeredAdmin', JSON.stringify(admin));  
            window.location.href = "adminlogin.html";   
        } else {  
            console.error("Unexpected data structure:", data);  
        }  

    } catch (error) {  
        console.error("Error registering admin:", error);  
    }  
}  

document.addEventListener("DOMContentLoaded", function() {  
    document.getElementById("signupForm").addEventListener("submit", function(event) {  
        event.preventDefault();   
        const adminData = {  
            fullname: document.getElementById("fullname").value,  
            username: document.getElementById("username").value,  
            email: document.getElementById("email").value,  
            password: document.getElementById("password").value,   
        };  

        registerAdmin(adminData);   
    });
});