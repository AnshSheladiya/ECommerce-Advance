// // controllers/activityLogController.js
// const {prisma} = require('../utils/dependencyContainer');

// exports.getActivityLogs = async (req, res, next) => {
//   try {
//     const activityLogs = await prisma.activityLog.findMany();
//     return res.status(200).json(activityLogs);
//   } catch (error) {
//     return next(error);
//   }
// };

// exports.getActivityLogById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const activityLog = await prisma.activityLog.findUnique({ where: { id: parseInt(id) } });
//     if (!activityLog) {
//       return res.status(404).json({ message: 'ActivityLog not found' });
//     }
//     return res.status(200).json(activityLog);
//   } catch (error) {
//     return next(error);
//   }
// };

// exports.createActivityLog = async (req, res, next) => {
//   try {
//     const { action, payload } = req.body;
//     const activityLog = await prisma.activityLog.create({
//       data: {
//         action,
//         payload
//       },
//     });
//     return res.status(201).json(activityLog);
//   } catch (error) {
//     return next(error);
//   }
// };

// exports.updateActivityLog = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { action, payload } = req.body;
//     const activityLog = await prisma.activityLog.update({
//       where: { id: parseInt(id) },
//       data: {
//         action,
//         payload
//       },
//     });
//     return res.status(200).json(activityLog);
//   } catch (error) {
//     return next(error);
//   }
// };

// exports.deleteActivityLog = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     await prisma.activityLog.delete({
//       where: { id: parseInt(id) },
//     });
//     return res.status(204).end();
//   } catch (error) {
//     return next(error);
//   }
// };