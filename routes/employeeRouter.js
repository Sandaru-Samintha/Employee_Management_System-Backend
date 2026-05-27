import express from "express";

import {
  saveEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee,
  getEmployeeById
} from "../controllers/employeeController.js";

const employeeRouter = express.Router();

employeeRouter.post("/saveemployee", saveEmployee); // POST : SAVE EMPLOYEE DATA
employeeRouter.get("/getemployees", getEmployees); // GET : FETCH EMPLOYEE DATA
employeeRouter.delete("/deleteemployee/:id", deleteEmployee); // DELETE : DELETE EMPLOYEE DATA
employeeRouter.put("/updateemployee/:id", updateEmployee); // PUT : UPDATE EMPLOYEE DATA
employeeRouter.get("/getemployee/:id", getEmployeeById); // GET : FETCH EMPLOYEE BY ID

export default employeeRouter;