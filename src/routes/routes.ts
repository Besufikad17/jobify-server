import { Router } from "express";
import { EmployeeController } from "../controllers/employee.controller";
import { OrganizationController } from "../controllers/organization.controller";
import { ProfileController } from "../controllers/profile.controller";

const route = Router();
const employeeController = new EmployeeController();
const orgController = new OrganizationController();
const profileController = new ProfileController();

// employee routes
route.post("/employee/register", employeeController.register);
route.post("/profile/create", profileController.createProfile);
route.get("/profile/:employeeId", profileController.getProfile);
route.put("/profile/update", profileController.updateProfile);

// organization routes
route.post("/org/register", orgController.register);

export { route }
