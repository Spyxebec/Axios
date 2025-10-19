# Employee Management System - Backend API

This is the backend API for the Employee Management System built with Node.js, Express, and MongoDB Atlas.

## 🚀 Features

- ✅ **GET** - Retrieve all employees
- ✅ **GET** - Retrieve a single employee by ID
- ✅ **POST** - Add a new employee
- ✅ **PUT** - Update employee information
- ✅ **DELETE** - Delete an employee

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

## 🛠️ Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies (already installed):
```bash
npm install
```

## ⚙️ Configuration

The `.env` file is already configured with your MongoDB Atlas connection:

```env
MONGODB_URI=mongodb+srv://aswath123:aswath123@cluster2.n70revl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2
PORT=5000
```

## 🎯 Running the Server

Start the backend server:

```bash
npm start
```

Or for development:

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### 1. Get All Employees
```
GET /api/employees
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "John Doe",
      "designation": "Software Engineer",
      "location": "New York",
      "salary": 75000,
      "createdAt": "2025-10-19T...",
      "updatedAt": "2025-10-19T..."
    }
  ],
  "count": 1
}
```

### 2. Get Single Employee
```
GET /api/employees/:id
```
**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "designation": "Software Engineer",
    "location": "New York",
    "salary": 75000
  }
}
```

### 3. Add New Employee
```
POST /api/employees
```
**Request Body:**
```json
{
  "name": "John Doe",
  "designation": "Software Engineer",
  "location": "New York",
  "salary": 75000
}
```
**Response:**
```json
{
  "success": true,
  "message": "Employee added successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "designation": "Software Engineer",
    "location": "New York",
    "salary": 75000
  }
}
```

### 4. Update Employee
```
PUT /api/employees/:id
```
**Request Body:**
```json
{
  "name": "John Doe",
  "designation": "Senior Software Engineer",
  "location": "San Francisco",
  "salary": 95000
}
```
**Response:**
```json
{
  "success": true,
  "message": "Employee updated successfully",
  "data": { ... }
}
```

### 5. Delete Employee
```
DELETE /api/employees/:id
```
**Response:**
```json
{
  "success": true,
  "message": "Employee deleted successfully"
}
```

### 6. Health Check
```
GET /api/health
```
**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-10-19T..."
}
```

## 🗄️ Database

- **Database Name:** `employeeDB`
- **Collection Name:** `employees`

## 🔒 Security Notes

⚠️ **Important:** The `.env` file contains sensitive credentials. In production:
- Never commit `.env` to version control
- Use environment variables in your hosting platform
- Rotate credentials regularly
- Use IP whitelisting in MongoDB Atlas

## 📦 Dependencies

- **express** - Web framework
- **mongodb** - MongoDB driver
- **cors** - Enable CORS
- **dotenv** - Environment variables

## 🧪 Testing the API

You can test the API using:
- Postman
- cURL
- Thunder Client (VS Code extension)
- Your frontend application

Example with cURL:
```bash
# Get all employees
curl http://localhost:5000/api/employees

# Add new employee
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Smith","designation":"Manager","location":"Boston","salary":85000}'
```

## 🚨 Troubleshooting

1. **MongoDB Connection Error:**
   - Check your internet connection
   - Verify MongoDB Atlas credentials
   - Ensure IP address is whitelisted in MongoDB Atlas

2. **Port Already in Use:**
   - Change the PORT in `.env` file
   - Kill the process using port 5000

3. **CORS Issues:**
   - CORS is already enabled for all origins
   - Adjust CORS settings in `app.js` if needed

## 📄 License

MIT
