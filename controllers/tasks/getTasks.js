const Task = require('../../models/Task');

// Get tasks with search, sorting, and filters
const getTasks = async (req, res) => {
  try {
    const { status, category, dueDate, search, sortBy, sortOrder } = req.query;

    const filter = { userId: req.user._id };

    // ----- FILTERS -----
    if (status) filter.status = status;
    if (category) filter.category = category;
    
    // Due date filtering - exact date match
    if (dueDate) {
      const date = new Date(dueDate);
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));
      filter.dueDate = { $gte: startOfDay, $lte: endOfDay };
    }

    // ----- SEARCH (title or description) -----
    if (search) {
      filter.$or = [
        { title: { $regex: decodeURIComponent(search), $options: 'i' } },
        { description: { $regex: decodeURIComponent(search), $options: 'i' } }
      ];
    }

    // ----- SORT -----
    const validSortFields = ['title', 'dueDate', 'status', 'category', 'createdAt', 'updatedAt'];
    const order = sortOrder === 'desc' ? -1 : 1;
    
    const sort = {};
    if (sortBy && validSortFields.includes(sortBy)) {
      sort[sortBy] = order;
    } else {
      sort['createdAt'] = -1; // default sort by newest first
    }

    const tasks = await Task.find(filter).sort(sort);
    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found' });
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getTasks };
