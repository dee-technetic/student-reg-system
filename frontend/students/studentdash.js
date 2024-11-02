



const registeredStudentData = JSON.parse(localStorage.getItem('registeredStudent'));

if (registeredStudentData) {
  document.getElementById('student-name').textContent = registeredStudentData.name;
  document.getElementById('student-email').textContent = registeredStudentData.email;
  document.getElementById('sd1').textContent = registeredStudentData.fullname;
  document.getElementById('sd2').textContent = registeredStudentData.age;
  document.getElementById('sd3').textContent = registeredStudentData.course;
  document.getElementById('sd4').textContent = registeredStudentData.gender;
  document.getElementById('sd5').textContent = registeredStudentData.email;
} else {
  console.log("No registration data found");
}


