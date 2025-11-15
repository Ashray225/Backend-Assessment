const Task = require('../../models/Task');

// Get single task by ID
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