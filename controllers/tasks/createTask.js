const Task = require('../../models/Task');

// Create new task
const createTask = async (req, res) => {

  // By default the status is set to 'pending' when a new task is created
  try {
    const { title, description, dueDate, category } = req.body;
    console.log('User in createTask:', req.user);
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