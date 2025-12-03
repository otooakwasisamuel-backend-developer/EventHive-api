import { Router } from "express";
import { isAuthenticated } from "../middlewares/authn.js";
import { cloudinaryUpload } from "../middlewares/upload.js";
import { postEvent, getEvents, getEvent, patchEvent, deleteEvent } from "../controllers/event.js";

// Create router
const eventRouter = Router();

// Define routes
eventRouter.post('/events', isAuthenticated, cloudinaryUpload.single('image'), postEvent);

eventRouter.get('/events', getEvents);

eventRouter.get('/events/:id', getEvent);

eventRouter.patch('/events/:id', isAuthenticated, cloudinaryUpload.single('image'), patchEvent);

eventRouter.delete('/events/:id', isAuthenticated, deleteEvent);

// Export router
export default eventRouter;