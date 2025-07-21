const express = require('express');
const router = express.Router();
const { getClients, getEmployees, getClientById, getEmployeeById } = require('../controllers/dataController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// GET /api/data/clients
router.get('/clients', getClients);

// GET /api/data/employees
router.get('/employees', getEmployees);

// GET /api/data/clients/:id
router.get('/clients/:id', getClientById);

// GET /api/data/employees/:id
router.get('/employees/:id', getEmployeeById);

module.exports = router;