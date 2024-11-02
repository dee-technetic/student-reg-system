import { registerAdmin, loginAdmin, getStudents, getCourses, deleteStudent, updateAdmin ,updateCourse,addCourse,deleteCourse, getOneStudent} from "../controller/adminController.js";
import {checkRolesAdmin } from "../middleware/checkroles.js";
import { authorizeUser } from "../middleware/authorize.js";
import express from "express";

const router = express.Router();

router.route('/register').post( registerAdmin);
router.route('/login').post( loginAdmin);
router.route('/list-students').get(authorizeUser , checkRolesAdmin(['admin']), getStudents);
router.route('/get-student/:id').get(authorizeUser , checkRolesAdmin(['admin']), getOneStudent);
router.route('/list-courses').get(getCourses);
router.route('/delete-student/:id').delete(authorizeUser , checkRolesAdmin(['admin']), deleteStudent);
router.route('/delete-course/:id').delete(authorizeUser , checkRolesAdmin(['admin']), deleteCourse);
router.route('/update-admin/:id').patch(authorizeUser , checkRolesAdmin(['admin']), updateAdmin);
router.route('/update-course/:id').patch(authorizeUser , checkRolesAdmin(['admin']), updateCourse);
router.route('/add-course').post(authorizeUser , checkRolesAdmin(['admin']), addCourse);

export default router; 