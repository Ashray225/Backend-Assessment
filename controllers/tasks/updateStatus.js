const Task = require('../../models/Task');

const updateStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const status = req.path.includes('markCompleted') ? 'completed' : 'pending';
    
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