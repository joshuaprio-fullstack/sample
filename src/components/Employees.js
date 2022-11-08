import { useState } from "react";
import { Link } from "react-router-dom";
import useFetchEmployees from "../hooks/useFetchEmployees";
import EmployeeTable from "./employees/EmployeeTable";
import { useEmployeesContext } from "../hooks/useEmployeesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Employees = () => {
  const { fetchEmployees } = useFetchEmployees();
  const { employees, dispatch } = useEmployeesContext();
  const [employee, setEmployee] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [id, setId] = useState("");
  const { user } = useAuthContext();

  const handleDelete = async (_id) => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND + `api/delete-employee/${_id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    const deleted_employee = await response.json();

    if (response.ok) {
      console.log(deleted_employee);
      dispatch({ type: "DELETE_EMPLOYEES", payload: deleted_employee });
    }
  };

  useState(() => {
    fetchEmployees();
  }, [employees]);

  return (
    <div>
      {showOverlay && (
        <div class="card text-center card-confirmation position-fixed card-danger">
          <div class="card-header">
            <strong>Confirm Deletion</strong>
          </div>
          <div class="card-body">
            <h5 class="card-title">
              <strong>Warning</strong>
            </h5>
            <p class="card-text">
              You are about to delete data related to{" "}
              <strong>{employee}</strong>. Take note that this process is
              irreversible. How would you like to proceed?
            </p>
            <Link
              onClick={(e) => {
                setShowOverlay(false);
                handleDelete(id);
              }}
              style={{ margin: "10px" }}
              to=""
            >
              Delete
            </Link>
            <button onClick={(e) => setShowOverlay(false)} class="btn btn-info">
              Cancel
            </button>
          </div>
        </div>
      )}
      {showOverlay && (
        <div
          onClick={(e) => setShowOverlay(false)}
          className="delete-overlay d-flex align-items-center justify-content-center"
        ></div>
      )}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Employees</h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content" style={{ marginBottom: "20px" }}>
          {user.isAdmin && (
            <div className="container-fluid">
              <div className="row">
                <div className="col col-5">
                  <Link to="add-employee" className="btn btn-success">
                    <i className="bi bi-plus-circle-fill"></i>Add New Employee
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card card-info">
                  <div className="card-header">
                    <h3 className="card-title">Employees Details</h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="table-responsive">
                      {/* <EmployeeTable /> */}
                      <EmployeeTable
                        setShowOverlay={setShowOverlay}
                        setEmployee={setEmployee}
                        setId={setId}
                      />
                    </div>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
};

export default Employees;
