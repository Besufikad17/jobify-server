import { Router } from "express";
import { EmployeeController } from "../controllers/employee.controller";

const route = Router();
const employeeController = new EmployeeController();

route.post("/start", employeeController.start);

export { route }
