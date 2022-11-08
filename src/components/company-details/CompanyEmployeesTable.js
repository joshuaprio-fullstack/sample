import { CSVLink } from "react-csv";
import { useAuthContext } from "../../hooks/useAuthContext";

const CompanyEmployeesTable = ({ company, employees }) => {
  const { user } = useAuthContext();

  const csv_headers = [
    { label: "_id", key: "_id" },
    { label: "first_name", key: "first_name" },
    { label: "last_name", key: "last_name" },
    { label: "company", key: "company" },
    { label: "email", key: "email" },
    { label: "password", key: "password" },
    { label: "is_admin", key: "is_admin" },
  ];

  return (
    <table id="example2" className="table table-bordered table-hover">
      <thead>
        {user.isAdmin && (
          <tr>
            <th colSpan={5}>
              <CSVLink
                className="btn btn-success"
                headers={csv_headers}
                data={company.employees ? company.employees : [[]]}
                separator={";"}
                filename={`Employees of ${company.name}`}
              >
                Export as CSV
              </CSVLink>
            </th>
          </tr>
        )}
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Number</th>
        </tr>
      </thead>
      <tbody>
        {employees !== [] &&
          employees.map((employee) => (
            <tr key={employee._id}>
              <td style={{ wordWrap: "break-word", maxWidth: "200px" }}>
                {employee._id}
              </td>
              <td> {employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
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
        </tr>
      </tfoot>
    </table>
  );
};

export default CompanyEmployeesTable;
