
import mongoose from "mongoose";

const studentReg = new mongoose.Schema(
  {
    fullname : {
        type:"string",
        required: true,
        maxlength: 255
    },
    age :{
        type:"number",
        default: 0,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "male",
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
      },
      role: {
        type: String,
        required:true,
        lowercase:true,
        default:"student",
      },
      password: {
        type: String,
        required: true,
        minlength: 10,
        
      },
      course:{
        type: String,
        required: true,
      },
},
{ timestamps: true }
);

export const Student = mongoose.model('Student',studentReg);