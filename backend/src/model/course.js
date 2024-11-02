import mongoose from 'mongoose';

const courseReg = new mongoose.Schema(
    {
    courseName: {
        type:"string",
        required: true,
        maxlength: 100
    },
    createdAt:{
        type: Date,
        default :Date.now
    }
},
{timestamp : true}
)

export const Course = mongoose.model('Course', courseReg);