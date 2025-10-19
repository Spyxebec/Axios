import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/employees';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    location: '',
    salary: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(API_URL, formData);
      console.log('Employee added:', response.data);
      setSubmitted(true);
      
      // Reset form and redirect after 2 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          designation: '',
          location: '',
          salary: ''
        });
        setSubmitted(false);
        navigate('/'); // Redirect to home page
      }, 2000);
    } catch (err) {
      console.error('Error adding employee:', err);
      setError(err.response?.data?.message || 'Failed to add employee. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Employee Form</h3>
            </div>
            <div className="card-body">
              {submitted && (
                <div className="alert alert-success" role="alert">
                  ✅ Employee added successfully! Redirecting to dashboard...
                </div>
              )}
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  ❌ {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter employee name"
                    disabled={loading}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="designation" className="form-label">Designation <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                    placeholder="Enter designation"
                    disabled={loading}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="location" className="form-label">Location <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="Enter location"
                    disabled={loading}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="salary" className="form-label">Salary <span className="text-danger">*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                    placeholder="Enter salary"
                    min="0"
                    step="0.01"
                    disabled={loading}
                  />
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Submitting...
                      </>
                    ) : (
                      'Submit'
                    )}
                  </button>
                  <button 
                    type="reset" 
                    className="btn btn-secondary"
                    onClick={() => {
                      setFormData({ name: '', designation: '', location: '', salary: '' });
                      setError(null);
                    }}
                    disabled={loading}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
