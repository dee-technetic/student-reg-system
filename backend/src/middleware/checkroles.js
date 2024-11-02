import { Student } from "../model/student.js";
import {Admin} from "../model/admin.js";
import httpStatus from "http-status";

const checkRoles = (roles) => {
  return async(req, res, next) => {
    try {
        const { id } = req.user;
        
        const user = await Student.findById(id);
        if (!user || !roles.includes(Student.role)){
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: "error",
                message: "Access denied, User unathorized!"
           })
        }

        next()
    } catch (error) {
      console.error(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: "An error occured while accessing the endpoint",
      });
    }
  };
};

const checkRolesAdmin = (roles) => {
    return async(req, res, next) => {
      try {
          const { id } = req.user;
          
          const user = await Admin.findById(id);
          if (!user || !roles.includes(user.role)){
              return res.status(httpStatus.UNAUTHORIZED).json({
                  status: "error",
                  message: "Access denied, User unathorized!"
             })
          }
  
          next()
      } catch (error) {
        console.error(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          status: "error",
          message: "An error occured while accessing the endpoint",
        });
      }
    };
  };

export { checkRoles,checkRolesAdmin };
