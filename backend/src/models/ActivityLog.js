import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  from:    { type: String },
  to:      { type: String },
  field:   { type: String }, // e.g. 'status' or 'assignee' or 'priority'
}, { timestamps: true });

export default mongoose.model('ActivityLog', activityLogSchema);
