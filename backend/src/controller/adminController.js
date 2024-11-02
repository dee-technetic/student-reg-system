import httpStatus from "http-status";
import { Admin } from "../model/admin.js";
import { Student } from "../model/student.js";
import { Course } from "../model/Course.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerAdmin = async (req, res) => {
  const { fullname, username, email, role, password } = req.body;

  if (!password) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "Please enter a password",
    });
  }

  try {
    let user = await Admin.findOne({ email: email });
    if (user) {
      return res.status(httpStatus.CONFLICT).json({
        status: "error",
        message: "email already exists",
      });
    }

    user = await Admin.findOne({ username: username });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new Admin({
      fullname,
      username,
      email,
      role,
      password: hashedPassword,
    });

    await user.save();

    res.status(httpStatus.CREATED).json({
      status: "success",
      message: "User registration successful",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Invalid",
    });
  }
};

const loginAdmin = async (req, res) => {  
  const { email, password } = req.body;  
  try {  
    const adminExists = await Admin.findOne({ email: email });  

    if (!adminExists) {  
      return res.status(httpStatus.NOT_FOUND).json({  
        status: "Not Found",  
        message: "Invalid login details",  
      });  
    }  

    const correctPassword = await bcrypt.compare(  
      password,  
      adminExists.password  
    );  

    if (!correctPassword) {  
      return res.status(httpStatus.UNAUTHORIZED).json({  
        status: "Unauthorized",  
        message: "Invalid password",  
      });  
    }  

    const token = jwt.sign(  
      {  
        id: adminExists._id,  
        email: adminExists.email,  
      },  
      process.env.JWT_SECRET  
    );  

    return res.status(httpStatus.OK).json({  
      status: "success",  
      message: "Token created",  
      adminData: {  
        id: adminExists._id,  
        name: adminExists.username,  
        email: adminExists.email, 
        authToken: token,   
      },  
      
    });  
 
  } catch (err) {  
    console.error(err);  
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({  
      status: "error",  
      message: "An error occurred while trying to login",  
    });  
  }  
};

const getStudents = async (req, res) => {
  try {
    const users = await Student.find({});

    if (users.length === 0) {
      console.log("No students found in the database."); // Log for debugging
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: "No Student found",
      });
    }

    res.status(httpStatus.OK).json({
      status: "success",
      message: "Registered Students retrieved successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error retrieving students:", error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "An error occurred while retrieving users",
    });
  }
};

// get one student
const getOneStudent = async (req,res) => {
  const {id, username, email} = req.query;
  try {
    let student;
    if (id) {  
      student = await Student.findById(id);  
      if (!student) {  
          return res.status(httpStatus.NOT_FOUND).json({  
              status: "error",  
              message: "student with the given id does not exist"  
          });  
      } else {  
          return res.status(httpStatus.OK).json({  
              status: "success",  
              message: "student retrieved successfully",  
              data: student  
          });  
      }  
  } else if (username) {  
      student = await Student.findOne({ username });  
      if (!student) {  
          return res.status(httpStatus.NOT_FOUND).json({  
              status: "error",  
              message: "student with the given username does not exist"  
          });  
      } else {  
          return res.status(httpStatus.OK).json({  
              status: "success",  
              message: "student retrieved successfully",  
              data: student  
          });  
      }  
  } else if (email) {
    student = await Student.findOne({ email});
    if(!student){
      return res.status(httpStatus.NOT_FOUND).json({
         status: "error",
         message: "student with email already exists"
      })
    }else{
      return res.status(httpStatus.OK).json({
        status: "success",
        message: "student retrieved successfully",
        data: student
      })
    }
  } else {  
      return res.status(httpStatus.BAD_REQUEST).json({  
          status: "error",  
          message: "Either id or username parameter is required"  
      });  
  }
    
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Invalid",
    });
    
  }
  
}

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});

    if (courses.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: "No courses found",
      });
    }

    res.status(httpStatus.OK).json({
      status: "success",
      message: "Courses retrieved successfully",
      data: courses,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "An error occurred while retrieving courses",
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Student.findByIdAndDelete(id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "Student not found",
      });
    }
    return res.status(httpStatus.NO_CONTENT).json({
      status: "success",
      message: "Student deleted successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Invalid",
    });
  }
};

// update admin
const updateAdmin = async (req, res) => {
  const { fullname, username, email, password } = req.body;
  const { id } = req.params;

  try {
    const adminExists = await Admin.findById(id);
    if (!adminExists) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "Admin not found",
      });
    }
    const emailExists = await Admin.findOne({ email });
    if (emailExists && emailExists._id.toString() !== id) {
      return res.status(httpStatus.CONFLICT).json({
        status: "error",
        message: "Admin with this email already exists",
      });
    }

    const usernameExists = await Admin.findOne({ username });
    if (usernameExists && usernameExists._id.toString() !== id) {
      return res.status(httpStatus.CONFLICT).json({
        status: "error",
        message: "Admin with this username already exists",
      });
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (fullname) updateData.fullname = fullname;
    if (password) updateData.password = password;

    const updatedUser = await Admin.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    return res.status(httpStatus.OK).json({
      status: "success",
      message: "Admin updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Invalid",
    });
  }
};

const addCourse = async (req, res) => {
  const { courseName, createdAt } = req.body;

  try {
    const courseExists = await Course.findOne({ courseName });
    if (courseExists) {
      return res.status(httpStatus.CONFLICT).json({
        status: "error",
        message: "Course with this name already exists",
      });
    }
    const course = new Course({ courseName, createdAt });
    await course.save();
    return res.status(httpStatus.CREATED).json({
      status: "success",
      message: "Course added successfully",
      data: course,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Invalid",
    });
  }
};

const updateCourse = async (req,res) => {
  const { courseName } = req.body;
  const { id } = req.params;

  try {
    const courseExists = await Course.findById(id);
    if (!courseExists) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "Course not found",
      });
    }
    const courseNameExists = await Course.findOne({ courseName });
    if (courseNameExists && courseNameExists._id.toString() !== id) {
      return res.status(httpStatus.CONFLICT).json({
        status: "error",
        message: "Course with this email already exists",
      });
    }

    const updateData = {};
    if (courseName) updateData.courseName = courseName;

    const updatedUser = await Course.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    return res.status(httpStatus.OK).json({
      status: "success",
      message: "Course updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Invalid",
    });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "Course not found",
      });
    }
    return res.status(httpStatus.NO_CONTENT).json({
      status: "success",
      message: "Course deleted successfully",
      data: course,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Invalid",
    });
  }
};
export {
  registerAdmin,
  loginAdmin,
  getStudents,
  getCourses,
  deleteStudent,
  updateAdmin,
  updateCourse,
  addCourse,
  deleteCourse,
  getOneStudent,
};
