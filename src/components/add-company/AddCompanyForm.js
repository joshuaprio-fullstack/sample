import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useCompaniesContext } from "../../hooks/useCompaniesContext";

const AddCompanyForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState({
    file: "",
    name: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const { user } = useAuthContext();
  const naviagte = useNavigate();
  const { dispatch } = useCompaniesContext();

  const handleSumbit = async (e) => {
    e.preventDefault();

    setIsloading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("website", website);
    formData.append("company-logo", logo.file);

    const response = await fetch(
      process.env.REACT_APP_BACKEND + "api/new-company",
      {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    const new_company = await response.json();

    if (response.ok) {
      setIsloading(false);
      dispatch({ type: "ADD_COMPANIES", payload: new_company });
      naviagte("/companies/" + new_company._id);
    }

    if (!response.ok) {
      setIsloading(false);
      setError(new_company.error);
    }
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSumbit}>
      <div className="card-body">
        <div className="form-group">
          <label htmlFor="company-name">Name</label>
          <input
            type="text"
            readOnly={!user.isAdmin}
            className="form-control"
            placeholder="Name"
            id="company-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company-email">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="company-email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company-website">Website</label>
          <input
            type="text"
            className="form-control"
            placeholder="Website (e.g. http://www.facebook.com)"
            id="company-website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company-logo">Logo</label>
          <div className="input-group">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="company-logo"
                accept=".jpg, .jpeg, .png,"
                onChange={(e) => {
                  setLogo({ name: e.target.value, file: e.target.files[0] });
                }}
              />
              <label className="custom-file-label" htmlFor="company-logo">
                {logo.name.replace("C:\\fakepath\\", "")}
              </label>
            </div>
            <div className="input-group-append">
              <span className="input-group-text">Upload</span>
            </div>
          </div>
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

export default AddCompanyForm;
