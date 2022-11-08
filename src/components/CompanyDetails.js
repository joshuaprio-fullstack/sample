import CompanyDetailsForm from "./company-details/CompanyDetailsForm";
import CompanyCard from "./company-details/CompanyCard";
import CompanyEmployeesTable from "./company-details/CompanyEmployeesTable";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import ImportEmployeesTable from "./company-details/ImportEmployeesTable";

const CompanyDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [company, setCompany] = useState({});
  const [employees, setEmployees] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    setIsLoading(true);
    const fetchComp = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND + "api/company/" + id,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      const fetched_company = await response.json();

      if (response.ok) {
        setIsLoading(false);
        setCompany(fetched_company);
        setEmployees(fetched_company.employees);
        return;
      }

      if (!response.ok) {
      }
    };

    fetchComp();
  }, []);

  if (company === undefined) {
    return (
      <div className="div content-wrapper">
        <h1>Loading...</h1>;
      </div>
    );
  }

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Edit Company</h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row row-cols-sm-1 row-cols-lg-2">
            {/* left column */}
            <div className="col col-lg-6 d-flex flex-column">
              {/* Company Card */}
              <CompanyCard isLoading={isLoading} props_company={company} />
              {/* /.card */}
            </div>
            <div className="col col-lg-6 d-flex flex-column">
              {/* general form elements */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Company Details</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <CompanyDetailsForm
                  isLoading={isLoading}
                  company={company}
                  id={id}
                  user={user}
                  setCompany={setCompany}
                />
              </div>
              {/* /.card */}
            </div>
            {/*/.col (left) */}
          </div>
          <div className="row">
            <div className="col">
              <div className="card card-info">
                <div className="card-header">
                  <h3 className="card-title">{company.name} Employees</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body ">
                  <div className="table-responsive">
                    <CompanyEmployeesTable
                      company={company}
                      employees={employees}
                    />
                  </div>
                </div>
                {/* /.card-body */}
              </div>
            </div>
          </div>
          {/* /.row */}
          {user.isAdmin && (
            <div className="row">
              <div className="col">
                <div className="card card-info">
                  <div className="card-header">
                    <h3 className="card-title">
                      Import Employees to {company.name}
                    </h3>
                  </div>
                  {/* /.card-header */}

                  <div className="card-body ">
                    <div className="table-responsive">
                      <ImportEmployeesTable
                        company_id={id}
                        setCompany={setCompany}
                        company={company}
                        setEmployees={setEmployees}
                        employees={employees}
                      />
                    </div>
                  </div>

                  {/* /.card-body */}
                </div>
              </div>
            </div>
          )}
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default CompanyDetails;
