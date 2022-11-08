import { Link } from "react-router-dom";
import { useCompaniesContext } from "../../hooks/useCompaniesContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const CompanyTable = ({ setShowOverLay, setCompany, setId }) => {
  const { companies } = useCompaniesContext();
  const { user } = useAuthContext();

  return (
    <table id="example2" className="table table-bordered table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Website</th>
          <th>Logo</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {companies &&
          companies.map((company) => (
            <tr key={company._id}>
              <td>{company._id}</td>
              <td>{company.name}</td>
              <td>{company.email}</td>
              <td>{company.website}</td>
              <td className="d-flex align-items-center justify-content-center">
                <img
                  src={process.env.REACT_APP_BACKEND + company.logo}
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                  }}
                  alt={`${company.name} logo`}
                />
              </td>
              <td className="">
                <Link
                  to={`${company._id}`}
                  className="btn btn-block btn-warning"
                >
                  View
                </Link>
                {user.isAdmin && (
                  <button
                    onClick={(e) => {
                      setId(company._id);
                      setCompany(company.name);
                      setShowOverLay(true);
                    }}
                    className="btn btn-block btn-danger"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Website</th>
          <th>Logo</th>
          <th>Actions</th>
        </tr>
      </tfoot>
    </table>
  );
};

export default CompanyTable;
