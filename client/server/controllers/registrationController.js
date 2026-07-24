import Registration from '../models/Registration.js';
import Event from '../models/Event.js';

export async function createRegistration(req, res) {
  try {
    const { eventId } = req.body;
    const event = await Event.findById(eventId);
    if (!event || event.status !== 'published') {
      return res.status(400).json({ message: 'Event not available for registration' });
    }

    const existing = await Registration.findOne({ user: req.user.id, event: eventId });
    if (existing) return res.status(400).json({ message: 'Already registered for this event' });

    const registration = await Registration.create({
      user: req.user.id,
      event: eventId,
      amount: event.fee,
      paymentStatus: 'pending',
    });

    res.status(201).json(registration);
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
}

export async function myRegistrations(req, res) {
  const registrations = await Registration.find({ user: req.user.id }).populate('event').lean();
  res.json(registrations);
}
