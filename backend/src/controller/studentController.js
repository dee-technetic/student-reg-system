import httpStatus from "http-status";
import { Student } from "../model/student.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerStudent = async (req, res) => {
  const { fullname, age, gender, email, role, password, course} = req.body;

  if (!password) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "Please enter a password",
    });
  }

  try {
    let user = await Student.findOne({ email: email });
    if (user) {
      return res.status(httpStatus.CONFLICT).json({
        status: "error",
        message: "email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new Student({
      fullname,
      age,
      gender,
      email,
      role,
      course,
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

const loginStudent = async (req, res) => {  
  const { email, password } = req.body;  
  
  try {  
    // Check if the student exists by email  
    const studentExists = await Student.findOne({ email: email });  

    if (!studentExists) {  
      return res.status(httpStatus.NOT_FOUND).json({  
        status: "Not Found",  
        message: "Invalid login details",  
      });  
    }  

    // Compare password with the hashed version  
    const correctPassword = await bcrypt.compare(password, studentExists.password);  

    if (!correctPassword) {  
      return res.status(httpStatus.UNAUTHORIZED).json({ // Use 401 for unauthorized access  
        status: "Unauthorized",  
        message: "Invalid password",  
      });  
    }  

    // Create an authorization token for the Student  
    const token = jwt.sign(  
      {  
        id: studentExists._id,  
        email: studentExists.email,  
      },  
      process.env.JWT_SECRET,  
      
    );  

    return res.status(httpStatus.OK).json({  
      status: "success",  
      message: "Token created",  
      studentData: {  
        id: studentExists._id,  
        name: studentExists.fullname,  
        email: studentExists.email,
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

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, age, email, gender, course,password } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { fullname, age, email, gender, course,password },
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "Student not found",
      });
    }
    return res.status(httpStatus.OK).json({
      status: "success",
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Invalid",
    });
  }
};
export { registerStudent, updateStudent, loginStudent };
