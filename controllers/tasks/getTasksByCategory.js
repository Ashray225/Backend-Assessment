const Task = require('../../models/Task');

/**
 * Fetches all tasks belonging to specific category for authenticated user
 * @param {Object} req - Contains category name in URL params
 * @param {Object} res - Returns array of tasks matching the category, sorted by creation date
 */
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