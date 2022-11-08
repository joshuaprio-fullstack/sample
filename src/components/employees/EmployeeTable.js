import { useEmployeesContext } from "../../hooks/useEmployeesContext";
import { useCompaniesContext } from "../../hooks/useCompaniesContext";
import useFetchCompanies from "../../hooks/useFetchCompanies";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const EmployeeTable = ({ setEmployee, setShowOverlay, setId }) => {
  const { employees } = useEmployeesContext();
  const { companies } = useCompaniesContext();
  const { fetchCompanies } = useFetchCompanies();
  const { user } = useAuthContext();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const companyName = (company_id) => {
    if (!companies) {
      return;
    }

    let fetched_company = companies.find(
      (company) => company_id === company._id
    );

    if (fetched_company !== undefined) {
      return fetched_company.name;
    } else {
      return "";
    }
  };

  return (
    <table id="example2" className="table table-bordered table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Number</th>
          {user.isAdmin && <th>Password</th>}
          <th>Company</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees &&
          employees.map((employee) => (
            <tr key={employee._id}>
              <td style={{ wordWrap: "break-word", maxWidth: "200px" }}>
                {employee._id}
              </td>
              <td> {employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              {user.isAdmin && (
                <td style={{ wordWrap: "break-word", maxWidth: "300px" }}>
                  {employee.password}
                </td>
              )}
              <td>
                {employee.company !== undefined &&
                  companyName(employee.company)}
              </td>
              <td className="">
                <Link
                  to={`${employee._id}`}
                  className="btn btn-block btn-warning"
                >
                  View
                </Link>
                {user.isAdmin && (
                  <button
                    onClick={(e) => {
                      setId(employee._id);
                      setEmployee(employee.first_name + employee.last_name);
                      setShowOverlay(true);
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
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Number</th>
          {user.isAdmin && <th>Password</th>}
          <th>Company</th>
          <th>Actions</th>
        </tr>
      </tfoot>
    </table>
  );
};

export default EmployeeTable;
