const { z } = require('zod');

// Shared task validation schema for create and update
const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().optional(),
  dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date format'),
  category: z.string().min(1, 'Category is required').max(50, 'Category must be less than 50 characters'),
  status: z.enum(['pending', 'completed']).optional()
});

// Query validation schema for listing
const querySchema = z.object({
  status: z.enum(['pending', 'completed']).optional(),
  category: z.string().optional(),
  dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date format').optional(),
  search: z.string().optional(),
  sortBy: z.enum(['title', 'dueDate', 'status', 'category', 'createdAt', 'updatedAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional()
});

// User validation schema for register and login
const userSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const validateRequest = (schema, source = 'body') => {
  return (req, res, next) => {
    try {
      const data = source === 'query' ? req.query : req.body;
      schema.parse(data);
      next();
    } catch (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }
  };
};

module.exports = { validateRequest, taskSchema, querySchema, userSchema };