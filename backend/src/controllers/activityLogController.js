import * as logSvc from '../services/activityLogService.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getLogs = asyncHandler(async (req, res) => {
  const logs = await logSvc.getActivityLogs(req.params.taskId);
  res.status(200).json({ success: true, logs });
});
