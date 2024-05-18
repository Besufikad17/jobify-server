import { Router } from "express";
import { EmployeeController } from "../controllers/employee.controller";

const route = Router();
const employeeController = new EmployeeController();

route.post("/start", employeeController.start);
route.post("/profile/create", employeeController.createProfile);
route.get("/profile/:employeeId", employeeController.getProfile);
route.put("/profile/update", employeeController.updateProfile);

export { route }
