import express from 'express';
import auth from '../middleware/auth.js';
import requireRole from '../middleware/requireRole.js';
import {
  listPublishedEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  listAllEventsAdmin,
} from '../controllers/eventController.js';

const router = express.Router();

// Public
router.get('/events', listPublishedEvents);

// Organizer only
router.get('/admin/events', auth, requireRole(['organizer']), listAllEventsAdmin);
router.post('/admin/events', auth, requireRole(['organizer']), createEvent);
router.put('/admin/events/:id', auth, requireRole(['organizer']), updateEvent);
router.delete('/admin/events/:id', auth, requireRole(['organizer']), deleteEvent);

export default router;
