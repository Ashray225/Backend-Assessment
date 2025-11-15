const Task = require('../../models/Task');

/**
 * Creates new task with title, description, dueDate, and category for authenticated user
 * @param {Object} req - Contains task details in body (title, description, dueDate, category)
 * @param {Object} res - Returns created task object with auto-generated ID and pending status
 */
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, category } = req.body;
    const task = new Task({
      userId: req.user._id,
      title,
      description,
      dueDate,
      category,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createTask };
