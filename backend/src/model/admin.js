import mongoose from "mongoose";

const adminReg = new mongoose.Schema(
{
    fullname : {
        type:"string",
        required: true,
        maxlength: 255
    },
    username : {
        type:"string",
        required: true,
        lowercase:true,
        maxlength: 10
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
        default:"admin",
      },
      password: {
        type: String,
        required: true,
        minlength: 10,
        
      },
},
{ timestamps: true }
);

export const Admin = mongoose.model('Admin',adminReg);