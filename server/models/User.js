import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  phone: { type: String },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ['participant', 'volunteer', 'organizer'],
    default: 'participant',
  },
  college: { type: String },
  department: { type: String },
  year: { type: String },
  assignedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  passId: { type: String, unique: true, sparse: true, index: true },
  qrCodeUrl: { type: String },
}, { timestamps: true });

export default mongoose.model('User', userSchema);

