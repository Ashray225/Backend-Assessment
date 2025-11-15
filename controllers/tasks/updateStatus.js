const Task = require('../../models/Task');

/**
 * Toggles task status between 'completed' and 'pending' based on endpoint called
 * @param {Object} req - Contains taskId in params, route determines status value
 * @param {Object} res - Returns updated task with new status
 */
const updateStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const status = req.path.includes('markCompleted') ? 'completed' : 'pending';
    
    // Atomic operation: status update happens atomically to prevent race conditions
    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user._id },
      { status },
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

module.exports = { updateStatus };