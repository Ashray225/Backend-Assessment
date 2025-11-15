const express = require('express');
const { createTask } = require('../controllers/tasks/createTask');
const { getTasks } = require('../controllers/tasks/getTasks');
const { getTaskById } = require('../controllers/tasks/getTaskById');
const { updateTask } = require('../controllers/tasks/updateTask');
const { deleteTask } = require('../controllers/tasks/deleteTask');
const { updateStatus } = require('../controllers/tasks/updateStatus');
const { getTasksByCategory } = require('../controllers/tasks/getTasksByCategory');
const { searchTasks } = require('../controllers/tasks/searchTasks');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest, taskSchema, querySchema } = require('../middleware/validation');

const router = express.Router();

// Apply authentication middleware to all task routes
router.use(authenticateToken);

// Task CRUD routes
router.post('/', validateRequest(taskSchema), createTask);
router.get('/', validateRequest(querySchema, 'query'), getTasks);
router.get('/search', searchTasks);
router.get('/category/:category', getTasksByCategory);
router.get('/:taskId', getTaskById);
router.put('/:taskId', validateRequest(taskSchema), updateTask);
router.delete('/:taskId', deleteTask);

// Task status management routes
router.post('/:taskId/markCompleted', updateStatus);
router.post('/:taskId/markPending', updateStatus);

module.exports = router;