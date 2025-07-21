import React, { useState, useEffect } from 'react';
import { getClients, getEmployees } from '../../services/api';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import './Dashboard.css';
import { formatCurrency, formatDate } from '../../utils/validation';

const Dashboard = ({ user, onLogout }) => {
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [clientsResponse, employeesResponse] = await Promise.all([
        getClients(),
        getEmployees()
      ]);

      if (clientsResponse.data.success) {
        setClients(clientsResponse.data.data);
      }

      if (employeesResponse.data.success) {
        setEmployees(employeesResponse.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClientSelect = (e) => {
    const clientId = parseInt(e.target.value);
    const client = clients.find(c => c.id === clientId);
    setSelectedClient(client || null);
  };

  const handleEmployeeSelect = (e) => {
    const employeeId = parseInt(e.target.value);
    const employee = employees.find(e => e.id === employeeId);
    setSelectedEmployee(employee || null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'status-active';
      case 'pending':
        return 'status-pending';
      case 'completed':
        return 'status-completed';
      default:
        return 'status-default';
    }
  };

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <Header user={user} onLogout={onLogout} />
        <div className="dashboard-content">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <Header user={user} onLogout={onLogout} />
        <div className="dashboard-content">
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h3>Error Loading Data</h3>
            <p>{error}</p>
            <button onClick={fetchData} className="btn btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Header user={user} onLogout={onLogout} />

      <div className="dashboard-content main-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome back, {user?.name}! Here's what's happening with your security operations.</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>{clients.length}</h3>
              <p>Total Clients</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔒</div>
            <div className="stat-info">
              <h3>{employees.length}</h3>
              <p>Team Members</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{clients.filter(c => c.status === 'Active').length}</h3>
              <p>Active Clients</p>
            </div>
          </div>
        </div>

        <div className="selectors">
          <select onChange={handleClientSelect}>
            <option value="">Select a Client</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>

          <select onChange={handleEmployeeSelect}>
            <option value="">Select an Employee</option>
            {employees.map(employee => (
              <option key={employee.id} value={employee.id}>{employee.name}</option>
            ))}
          </select>
        </div>

        <div className="details-section">
          {selectedClient && (
            <div className="details-card">
              <h3>Client Details</h3>
              <p><strong>Name:</strong> {selectedClient.name}</p>
              <p><strong>Email:</strong> {selectedClient.email}</p>
              <p><strong>Status:</strong> <span className={getStatusColor(selectedClient.status)}>{selectedClient.status}</span></p>
              {selectedClient.totalAmount && (
                <p><strong>Total Paid:</strong> {formatCurrency(selectedClient.totalAmount)}</p>
              )}
              {selectedClient.receiptDate && (
                <p><strong>Receipt Date:</strong> {formatDate(selectedClient.receiptDate)}</p>
              )}
            </div>
          )}

          {selectedEmployee && (
            <div className="details-card">
              <h3>Employee Details</h3>
              <p><strong>Name:</strong> {selectedEmployee.name}</p>
              <p><strong>Email:</strong> {selectedEmployee.email}</p>
              <p><strong>Role:</strong> {selectedEmployee.role}</p>
              {selectedEmployee.joinDate && (
                <p><strong>Joined:</strong> {formatDate(selectedEmployee.joinDate)}</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
