import mongoose from "mongoose";

const EmployeeSchema = mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["Active", "Inactive"],
    default: "Active"
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  }
});

const Employee = mongoose.model("employee", EmployeeSchema);

export default Employee;
