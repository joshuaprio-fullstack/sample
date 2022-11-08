import Papa from "papaparse";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const ImportEmployeesTable = ({ company_id, employees, setEmployees }) => {
  const [csvFile, setCsvFile] = useState({
    name: "",
    file: "",
  });
  const [importedEmployees, setImportedEmployees] = useState([]);
  const [successfulImports, setSuccessfulImports] = useState([]);
  const { user } = useAuthContext();

  const handleLoad = async (e) => {
    e.preventDefault();

    if (!csvFile.file) {
      return;
    }

    Papa.parse(csvFile.file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          alert("Invaid CSV contents");
          setCsvFile({
            name: "",
            file: "",
          });
          return;
        }
        setImportedEmployees(results.data);
      },
    });
  };

  const handleImport = async (e) => {
    e.preventDefault();

    importedEmployees.map(async (employee) => {
      const data = {
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        company: company_id,
        phone: employee.phone,
        is_admin: employee.is_admin,
      };

      const exists = employees.some((element) => element._id === employee._id);

      if (exists) {
        return;
      }

      const response = await fetch(
        process.env.REACT_APP_BACKEND + "api/update-employee/" + employee._id,
        {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const new_employee = await response.json();

      if (response.ok) {
        setEmployees((previous_state) => [...previous_state, new_employee]);
      }

      if (!response.ok) {
        console.log(response);
      }
    });
  };

  return (
    <table id="example2" className="table table-bordered table-hover">
      <thead>
        <tr>
          <th colSpan={5}>
            <div className="form-group">
              <label htmlFor="csv-file">Upload a CSV File</label>
              <div className="input-group">
                <div className="custom-file">
                  <form encType="multipart/form-data">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="csv-file"
                      accept={".csv"}
                      onChange={(e) => {
                        setImportedEmployees([]);
                        setCsvFile({
                          name: e.target.value,
                          file: e.target.files[0],
                        });
                      }}
                    />
                  </form>
                  <label className="custom-file-label" htmlFor="csv-file">
                    {csvFile.name && csvFile.name.replace("C:\\fakepath\\", "")}
                  </label>
                </div>
                <div className="input-group-append">
                  <span>
                    <button
                      style={{ marginRight: "3px", marginLeft: "3px" }}
                      onClick={handleLoad}
                      className="btn btn-success"
                    >
                      Load
                    </button>
                    <button
                      style={{ marginRight: "3px", marginLeft: "3px" }}
                      onClick={handleImport}
                      className="btn btn-primary"
                    >
                      Import
                    </button>
                    <button
                      style={{ marginRight: "3px", marginLeft: "3px" }}
                      onClick={(e) => {
                        setImportedEmployees([]);
                      }}
                      className="btn btn-danger"
                    >
                      Clear
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </th>
        </tr>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Number</th>
        </tr>
      </thead>
      <tbody>
        {importedEmployees &&
          importedEmployees.map((employee) => (
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

export default ImportEmployeesTable;
