import Employee from "../models/employee.js"; 
import { isAdmin } from "./userController.js";

// ==================================================
// POST : SAVE EMPLOYEE DATA
// ==================================================
export const saveEmployee = async (req, res) => {
  try {

    if (!isAdmin(req, res)) {
      return res.status(403).json({
        status: "error",
        message: "You do not have permission to add employees!"
      });
    }

    const employee = new Employee({
      employeeId: req.body.employeeId,
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      status: req.body.status || "Active",
      phoneNumber: req.body.phoneNumber
    });

    await employee.save();

    return res.status(201).json({
      status: "success",
      message: "Employee saved successfully"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error
    });
  }
};

// ==================================================
// GET : FETCH EMPLOYEE DATA
// ==================================================
export const getEmployees = async (req, res) => {
  try {
    if (isAdmin(req, res)) {
      const employees = await Employee.find();
      return res.status(200).json({
        status: "success",
        data: employees
      });
    } else {
      const employees = await Employee.find({ status: "Active" });
      return res.status(200).json({
        status: "success",
        data: employees
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error
    });
  }
};

// ==================================================
// DELETE : DELETE EMPLOYEE DATA
// ==================================================
export const deleteEmployee = async (req, res) => {
  try {
    if (isAdmin(req, res)) {
      await Employee.findOneAndDelete({ employeeId: req.params.id });
      return res.status(200).json({
        status: "success",
        message: "Employee deleted successfully"
      });
    } else {
      return res.status(403).json({
        status: "error",
        message: "You do not have permission to delete employees!"
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error
    });
  }
};

// ==================================================
// UPDATE : UPDATE EMPLOYEE DATA
// ==================================================
export const updateEmployee = async (req, res) => {
  try {
    if (isAdmin(req, res)) {
      const updatedData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        status: req.body.status,
        phoneNumber: req.body.phoneNumber
      };

      await Employee.findOneAndUpdate({ employeeId: req.params.id }, updatedData);

      return res.status(200).json({
        status: "success",
        message: "Employee updated successfully"
      });
    } else {
      return res.status(403).json({
        status: "error",
        message: "You do not have permission to update employees!"
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error
    });
  }
};

// ==================================================
// GET : GET SINGLE EMPLOYEE BY ID
// ==================================================
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeId: req.params.id });

    if (!employee) {
      return res.status(404).json({
        status: "error",
        message: "Employee not found"
      });
    }

    if (!isAdmin(req, res) && employee.status !== "Active") {
      return res.status(403).json({
        status: "error",
        message: "You do not have permission to view this employee!"
      });
    }

    return res.status(200).json({
      status: "success",
      data: employee
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error
    });
  }
};