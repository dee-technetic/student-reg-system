async function addCourse(courseName) {
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      console.error("Missing authentication token. Please log in.");
      return;
    }
  
    const createdAt = new Date();
  
    try {
      const response = await fetch('http://localhost:5000/api/admin/add-course', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ courseName, createdAt }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const course = data.data;
  
      console.log('Course added successfully:', course);
      window.location.href = "courses.html";
  
    } catch (error) {
      console.error('Error adding course:', error);
      
    }
  }
  
  document.getElementById('courseForm').addEventListener('submit', async event => {
    event.preventDefault();
  
    const courseName = document.getElementById('courseNameInput').value;
  
    await addCourse(courseName);
  });