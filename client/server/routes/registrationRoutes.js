import express from 'express';
import auth from '../middleware/auth.js';
import { createRegistration, myRegistrations } from '../controllers/registrationController.js';

const router = express.Router();

router.post('/registrations', auth, createRegistration);
router.get('/me/registrations', auth, myRegistrations);

export default router;
