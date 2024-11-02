export function displayErrorMessage(message) {
    const messageContainer = document.getElementById("message-container");
    const messageElement = document.getElementById("message");

    messageElement.textContent = message;
    messageContainer.classList.add("error"); 
    messageContainer.style.display = "block"; 
}

export function displaySuccessMessage(message) {
    const messageContainer = document.getElementById("message-container");
    const messageElement = document.getElementById("message");

    messageElement.textContent = message;
    messageContainer.classList.remove("error"); 
    messageContainer.classList.add("success"); 
    messageContainer.style.display = "block"; 
}