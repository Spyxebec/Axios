const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist')); // Serve the dist/build files

// MongoDB Connection
const uri = process.env.MONGODB_URI || "add your connection string from mongodbatlas";
const client = new MongoClient(uri);

let db;
let employeesCollection;

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log('✅ Connected to MongoDB Atlas successfully!');
    db = client.db('employeeDB'); // Database name
    employeesCollection = db.collection('employees'); // Collection name
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('⚠️  Troubleshooting tips:');
    console.log('   1. Check your internet connection');
    console.log('   2. Verify IP is whitelisted in MongoDB Atlas (Network Access)');
    console.log('   3. Check username and password are correct');
    console.log('⚠️  Server will continue running but database operations will fail');
    // Don't exit, allow server to run for testing
  }
}

// Initialize database connection
connectDB();

// ==================== API ROUTES ====================

// GET: Retrieve all employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await employeesCollection.find({}).toArray();
    res.status(200).json({
      success: true,
      data: employees,
      count: employees.length
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching employees',
      error: error.message
    });
  }
});

// GET: Retrieve a single employee by ID
app.get('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee ID format'
      });
    }

    const employee = await employeesCollection.findOne({ _id: new ObjectId(id) });
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching employee',
      error: error.message
    });
  }
});

// POST: Add a new employee
app.post('/api/employees', async (req, res) => {
  try {
    const { name, designation, location, salary } = req.body;

    // Validate required fields
    if (!name || !designation || !location || !salary) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, designation, location, salary) are required'
      });
    }

    // Create new employee object
    const newEmployee = {
      name,
      designation,
      location,
      salary: parseFloat(salary),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await employeesCollection.insertOne(newEmployee);
    
    res.status(201).json({
      success: true,
      message: 'Employee added successfully',
      data: {
        _id: result.insertedId,
        ...newEmployee
      }
    });
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding employee',
      error: error.message
    });
  }
});

// PUT: Update employee information
app.put('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, location, salary } = req.body;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee ID format'
      });
    }

    // Validate at least one field to update
    if (!name && !designation && !location && !salary) {
      return res.status(400).json({
        success: false,
        message: 'At least one field must be provided for update'
      });
    }

    // Build update object
    const updateData = {
      updatedAt: new Date()
    };
    
    if (name) updateData.name = name;
    if (designation) updateData.designation = designation;
    if (location) updateData.location = location;
    if (salary) updateData.salary = parseFloat(salary);

    const result = await employeesCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data: result
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating employee',
      error: error.message
    });
  }
});

// DELETE: Delete a single employee
app.delete('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee ID format'
      });
    }

    const result = await employeesCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting employee',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date()
  });
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await client.close();
  console.log('✅ MongoDB connection closed');
  process.exit(0);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});
