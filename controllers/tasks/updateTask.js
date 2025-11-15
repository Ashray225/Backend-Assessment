const Task = require('../../models/Task');

/**
 * Modifies task fields (title, description, dueDate, category, status) by taskId
 * @param {Object} req - Contains taskId in params and update fields in body
 * @param {Object} res - Returns updated task object or 404 if not found
 */
const updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, category, status } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.taskId, userId: req.user._id },
      { title, description, dueDate, category, status , updatedAt: Date.now() },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { updateTask };