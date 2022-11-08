import { useEffect, useState } from "react";
import { useCompaniesContext } from "../../hooks/useCompaniesContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEmployeesContext } from "../../hooks/useEmployeesContext";
import { useNavigate } from "react-router-dom";
import useFetchCompanies from "../../hooks/useFetchCompanies";

const AddEmployeeForm = () => {
  const { companies } = useCompaniesContext();
  const { dispatch } = useEmployeesContext();
  const { fetchCompanies } = useFetchCompanies();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleCheck = () => {
    setIsAdmin(!isAdmin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      company: company,
      phone: phone,
      is_admin: isAdmin,
    };

    const response = await fetch(process.env.REACT_APP_BACKEND + "signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });

    const new_employee = await response.json();

    if (response.ok) {
      setIsLoading(false);
      dispatch({ type: "ADD_EMPLOYEES", payload: new_employee });
      navigate("/employees/" + new_employee._id);
    }

    if (!response.ok) {
      setIsLoading(false);
      setError(new_employee.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card-body">
        <div className="form-group">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">
            Phone Number <i>(e.g. 09123456789)</i>
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            placeholder="Enter Phone Number"
            pattern="[0-9]{11}"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Company</label>
          <select
            className="form-control select2"
            style={{ width: "100%" }}
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
              console.log(company);
            }}
          >
            <option value={""}>Select Company</option>
            {companies &&
              companies.map((company) => (
                <option value={company._id}>{company.name}</option>
              ))}
          </select>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="admin"
            checked={isAdmin}
            onChange={handleCheck}
          />
          <label className="form-check-label" htmlFor="admin">
            Admin
          </label>
        </div>
      </div>
      {/* /.card-body */}
      <div className="card-footer">
        {!isLoading && (
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        )}
        {isLoading && (
          <div>
            <img
              src="/loading.gif"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
              className="img-responsive"
            />
            <h3 style={{ color: "blue" }}>Saving...</h3>
          </div>
        )}
        {error && (
          <div style={{ marginTop: "10px" }} className="alert alert-danger">
            {error}
          </div>
        )}
      </div>
    </form>
  );
};

export default AddEmployeeForm;
