import { useState } from 'react';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    location: '',
    salary: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        designation: '',
        location: '',
        salary: ''
      });
      setSubmitted(false);
    }, 3000);
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
                  Employee details saved successfully!
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
                  />
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <button 
                    type="reset" 
                    className="btn btn-secondary"
                    onClick={() => setFormData({ name: '', designation: '', location: '', salary: '' })}
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
