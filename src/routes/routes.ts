import { Router } from "express";
import { EmployeeController } from "../controllers/employee.controller";
import { OrganizationController } from "../controllers/organization.controller";

const route = Router();
const employeeController = new EmployeeController();
const orgController = new OrganizationController();

// employee routes
route.post("/employee/register", employeeController.register);
route.post("/profile/create", employeeController.createProfile);
route.get("/profile/:employeeId", employeeController.getProfile);
route.put("/profile/update", employeeController.updateProfile);

// organization routes
route.post("/org/register", orgController.register);

export { route }
