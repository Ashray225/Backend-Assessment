const Task = require('../../models/Task');

/**
 * Permanently removes task by taskId from user's task list
 * @param {Object} req - Contains taskId in URL params
 * @param {Object} res - Returns success message or 404 if task not found
 */
const deleteTask = async (req, res) => {
  try {
    // Atomic operation: findOneAndDelete ensures task is found and deleted atomically
    const task = await Task.findOneAndDelete({ 
      _id: req.params.taskId, 
      userId: req.user._id 
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { deleteTask };