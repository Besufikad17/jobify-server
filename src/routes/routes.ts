import { Router } from "express";
import { EmployeeController } from "../controllers/employee.controller";
import { OrganizationController } from "../controllers/organization.controller";
import { ProfileController } from "../controllers/profile.controller";
import { PostController } from "../controllers/post.controller";
import { ApplicationController } from "../controllers/application.controller";

const route = Router();
const applicationController = new ApplicationController();
const employeeController = new EmployeeController();
const orgController = new OrganizationController();
const postController = new PostController();
const profileController = new ProfileController();

// employee routes
route.post("/employee/register", employeeController.register);
route.get("/employee/:id", employeeController.getEmployee);

// employee profile route
route.post("/profile/create", profileController.createProfile);
route.get("/profile/:id", profileController.getProfile);
route.put("/profile/update/:id", profileController.updateProfile);

// organization routes
route.post("/org/register", orgController.register);

// job post routes
route.post("/post/create", postController.createPost);
route.get("/posts", postController.getAllPosts);
route.get("/post/:id", postController.getPostById);
route.put("/post/:id", postController.updatePost);
route.delete("/post/:id", postController.deletePost);

// job application routes
route.post("/apply", applicationController.apply);
route.get("/applications", applicationController.getApplications);
route.get("/application/:id", applicationController.getApplicationById);
route.put("/application/:id", applicationController.updateApplication);
route.delete("/application/:id", applicationController.deleteApplication);

export { route }
