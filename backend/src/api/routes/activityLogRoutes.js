// routes/activityLogRoutes.js
const express = require('express');
const router = express.Router();
const activityLogController = require('../controllers/activityLogController');

router.get('/activityLogs', activityLogController.getActivityLogs);
router.get('/activityLogs/:id', activityLogController.getActivityLogById);
router.post('/activityLogs', activityLogController.createActivityLog);
router.put('/activityLogs/:id', activityLogController.updateActivityLog);
router.delete('/activityLogs/:id', activityLogController.deleteActivityLog);

module.exports = router;