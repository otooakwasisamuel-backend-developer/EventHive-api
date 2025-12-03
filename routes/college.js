import { Router } from "express";
import { isAuthenticated } from "../middlewares/authn.js";
import { cloudinaryUpload } from "../middlewares/upload.js";
import { postCollege, getColleges, getCollege, patchCollege, deleteCollege } from "../controllers/college.js";

// Create router
const collegeRouter = Router();

// Define routes
collegeRouter.post('/colleges', isAuthenticated, cloudinaryUpload.single('image'), postCollege);

collegeRouter.get('/colleges', getColleges);

collegeRouter.get('/colleges/:id', getCollege);

collegeRouter.patch('/colleges/:id', isAuthenticated, cloudinaryUpload.single('image'), patchCollege);

collegeRouter.delete('/colleges/:id', isAuthenticated, deleteCollege);

// Export router
export default collegeRouter;