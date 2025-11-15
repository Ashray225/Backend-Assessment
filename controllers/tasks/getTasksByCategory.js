const Task = require('../../models/Task');

// Get tasks by category
const getTasksByCategory = async (req, res) => {
  try {
    const tasks = await Task.find({ 
      userId: req.user._id, 
      category: req.params.category 
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getTasksByCategory };