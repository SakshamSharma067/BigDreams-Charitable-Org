import { Router } from 'express';
import { 
    createVolunteer, 
    getAllVolunteers, 
    getVolunteerById,
    updateVolunteer,
    deleteVolunteer 
} from '../controllers/volunteer.controller.js';
import { isAuthenticated, authorizeRoles } from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const volunteerRouter = Router();

// Public routes
volunteerRouter.get('/get-all', getAllVolunteers);
volunteerRouter.get('/:id', getVolunteerById);

// Protected routes
volunteerRouter.post('/register', isAuthenticated, createVolunteer);
volunteerRouter.put('/:id', isAuthenticated, authorizeRoles('volunteer', 'admin'), upload.single('image'), updateVolunteer);
volunteerRouter.delete('/:id', isAuthenticated, authorizeRoles('admin'), deleteVolunteer);

export default volunteerRouter;
