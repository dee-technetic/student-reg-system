import { registerStudent , updateStudent, loginStudent} from "../controller/studentController.js";
import { authorizeUser } from "../middleware/authorize.js";
import {checkRoles } from "../middleware/checkroles.js";
import express from "express";

const router = express.Router();

router.route('/register').post(registerStudent);
router.route('/update/:id').patch(updateStudent);
router.route('/login').post(loginStudent);

export default router;