const fs = require('fs');
const path = require('path');

// Helper function to read JSON files
const readJSONFile = (filename) => {
  try {
    const filePath = path.join(__dirname, '../data', filename);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
};

// Get all clients
const getClients = async (req, res) => {
  try {
    const clients = readJSONFile('clients.json');
    
    res.json({
      success: true,
      message: 'Clients fetched successfully',
      data: clients
    });
  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching clients data'
    });
  }
};

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = readJSONFile('employees.json');
    
    res.json({
      success: true,
      message: 'Employees fetched successfully',
      data: employees
    });
  } catch (error) {
    console.error('Get employees error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching employees data'
    });
  }
};

// Get client by ID
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const clients = readJSONFile('clients.json');
    const client = clients.find(c => c.id === parseInt(id));
    
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Client fetched successfully',
      data: client
    });
  } catch (error) {
    console.error('Get client by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching client data'
    });
  }
};

// Get employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employees = readJSONFile('employees.json');
    const employee = employees.find(e => e.id === parseInt(id));
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Employee fetched successfully',
      data: employee
    });
  } catch (error) {
    console.error('Get employee by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching employee data'
    });
  }
};

module.exports = {
  getClients,
  getEmployees,
  getClientById,
  getEmployeeById
};