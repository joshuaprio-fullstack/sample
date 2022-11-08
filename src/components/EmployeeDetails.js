import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchCompany from "../hooks/useFetchCompany";
import { useFetchEmployee } from "../hooks/useFetchEmployee";
import EmployeeDetailsForm from "./employee-details/EmployeeDetailsForm";

const EmployeeDetails = () => {
  const { fetchCompany } = useFetchCompany();
  const { id } = useParams();
  const { fetchEmployee, error, isLoading } = useFetchEmployee();

  useEffect(() => {
    fetchCompany();
    fetchEmployee(id);
  }, []);
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Edit Employee</h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* left column */}
            <div className="col">
              {/* general form elements */}
              <div className="card card-info">
                <div className="card-header">
                  <h3 className="card-title">Employee Details</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <EmployeeDetailsForm />
              </div>
              {/* /.card */}
            </div>
            {/*/.col (left) */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default EmployeeDetails;
