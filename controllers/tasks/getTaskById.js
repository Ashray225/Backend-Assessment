const Task = require('../../models/Task');

/**
 * Fetches single task by taskId ensuring it belongs to authenticated user
 * @param {Object} req - Contains taskId in URL params
 * @param {Object} res - Returns task object or 404 if not found/unauthorized
 */
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.taskId, 
      userId: req.user._id 
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getTaskById };