import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  venue: { type: String },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  fee: { type: Number, default: 0 },
  maxSeats: { type: Number },
  seatsTaken: { type: Number, default: 0 },
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['draft', 'published', 'closed'],
    default: 'draft',
    index: true,
  },
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);

