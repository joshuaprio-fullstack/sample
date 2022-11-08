import { useEffect, useState } from "react";

const CompanyDetailsForm = ({ id, user, company, setCompany }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [website, setWebsite] = useState();
  const [logo, setLogo] = useState({
    file: "",
    name: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("website", website);
    formData.append("company-logo", logo.file);

    const response = await fetch(
      process.env.REACT_APP_BACKEND + "api/update-company/" + id,
      {
        method: "PATCH",
        body: formData,
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    const updated_company = await response.json();

    if (response.ok) {
      setIsLoading(false);
      setIsSuccess(true);
      setError(null);
      setCompany(updated_company);
      setTimeout(() => setIsSuccess(false), 2000);
    }

    if (!response.ok) {
      setIsLoading(false);
      setError(updated_company);
    }
  };

  useEffect(() => {
    setName(company.name);
    setEmail(company.email);
    setWebsite(company.website);
    setLogo({ name: company.logo });
  }, [company]);

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
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
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company-email">Email</label>
          <input
            type="email"
            readOnly={!user.isAdmin}
            className="form-control"
            id="company-email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company-website">Website</label>
          <input
            type="text"
            readOnly={!user.isAdmin}
            className="form-control"
            placeholder="Website (e.g. http://www.facebook.com)"
            id="company-website"
            value={website}
            onChange={(e) => {
              setWebsite(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company-logo">Logo</label>
          <div className="input-group">
            <div className="custom-file">
              {user.isAdmin && (
                <input
                  type="file"
                  readOnly={!user.isAdmin}
                  className="custom-file-input"
                  id="company-logo"
                  accept="*.jpg *.jpeg *.png"
                  onChange={(e) => {
                    setLogo({ name: e.target.value, file: e.target.files[0] });
                  }}
                />
              )}
              <label className="custom-file-label" htmlFor="company-logo">
                {logo.name && logo.name.replace("C:\\fakepath\\", "")}
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* /.card-body */}
      {user.isAdmin && (
        <div className="card-footer">
          {!isLoading && (
            <button type="submit" className="btn btn-primary">
              Save Edits
            </button>
          )}
          {isLoading && (
            <div>
              <img
                src="/loading.gif"
                style={{ maxWidth: "50px", maxHeight: "50px" }}
                className="img-responsive"
              />
              <h5 style={{ color: "blue" }}>Saving...</h5>
            </div>
          )}
          {isSuccess && (
            <h5 style={{ color: "green", marginTop: "10px" }}>
              Changes are successfuly saved!
            </h5>
          )}
          {error && (
            <div style={{ marginTop: "10px" }} className="alert alert-danger">
              {error}
            </div>
          )}
        </div>
      )}
    </form>
  );
};

export default CompanyDetailsForm;
