const Task = require('../../models/Task');

/**
 * Performs case-insensitive text search across task titles and descriptions
 * @param {Object} req - Contains search query 'q' in query params
 * @param {Object} res - Returns matching tasks sorted by creation date, or error if no query
 */
const searchTasks = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query required' });
    }

    const tasks = await Task.find({
      userId: req.user._id,
      $or: [
        { title: { $regex: decodeURIComponent(q), $options: 'i' } },
        { description: { $regex: decodeURIComponent(q), $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { searchTasks };