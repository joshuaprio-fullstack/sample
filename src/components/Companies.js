import { Link } from "react-router-dom";
import CompanyTable from "./companies/CompanyTable";
import { useEffect, useState } from "react";
import useFetchCompanies from "../hooks/useFetchCompanies";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCompaniesContext } from "../hooks/useCompaniesContext";

const Companies = () => {
  const { fetchCompanies } = useFetchCompanies();
  const [showOverlay, setShowOverLay] = useState(false);
  const [company, setCompany] = useState("");
  const [id, setId] = useState("");
  const { user } = useAuthContext();
  const { dispatch } = useCompaniesContext();

  //data filtering
  const [sortField, setSortField] = useState("name");
  const [order, setOrder] = useState("1");
  const [limit, setLimit] = useState("0");
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = async (_id) => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND + `api/delete-company/${_id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    const deleted_company = await response.json();

    if (response.ok) {
      setShowOverLay(false);
      dispatch({ type: "DELETE_COMPANIES", payload: deleted_company });
    }
  };

  useEffect(() => {
    //gets number of companies and will be used on pagination
    const fetchCompanyCounts = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND + "api/companies-count",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      const fetched_companies_count = await response.json();

      if (response.ok) {
        return;
      }

      if (!response.ok) {
      }
    };

    fetchCompanyCounts();
    fetchCompanies(sortField, order, limit, skip);
  }, [sortField, order, limit, skip, currentPage]);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    setSkip(currentPage * limit);
    fetchCompanies(sortField, order, limit, skip);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
    setSkip(currentPage * limit);
    fetchCompanies(sortField, order, limit, skip);
  };

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
              You are about to delete data related to <strong>{company}</strong>
              . Take note that this process is irreversible. How would you like
              to proceed?
            </p>
            <Link
              onClick={(e) => {
                handleDelete(id);
              }}
              style={{ margin: "10px" }}
              to=""
            >
              Delete
            </Link>
            <button onClick={(e) => setShowOverLay(false)} class="btn btn-info">
              Cancel
            </button>
          </div>
        </div>
      )}
      {showOverlay && (
        <div
          onClick={(e) => setShowOverLay(false)}
          className="delete-overlay d-flex align-items-center justify-content-center"
        ></div>
      )}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Companies</h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content" style={{ marginBottom: "20px" }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col col-5">
                {user.isAdmin && (
                  <Link to="add-company" className="btn btn-success">
                    <i className="bi bi-plus-circle-fill"></i>Add New Company
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card card-info">
                  <div className="card-header">
                    <h3 className="card-title">Company Details</h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body ">
                    <div className="d-flex">
                      <div className="form-group">
                        <label>Sort By:</label>
                        <select
                          value={sortField}
                          onChange={(e) => {
                            setSortField(e.target.value);
                          }}
                          className="form-control select2"
                        >
                          <option value={"name"}>Name</option>
                          <option value={"email"}>Email</option>
                          <option value={"createdAt"}>Date Added</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Order:</label>
                        <select
                          value={order}
                          onChange={(e) => {
                            setOrder(e.target.value);
                          }}
                          className="form-control select2"
                        >
                          <option value={"1"}>Ascending</option>
                          <option value={"-1"}>Descending</option>
                        </select>
                      </div>
                      {/* <div className="form-group">
                        <label>Limit:</label>
                        <select
                          value={limit}
                          onChange={(e) => {
                            setLimit(e.target.value);
                          }}
                          className="form-control select2"
                        >
                          <option value={"5"}>5</option>
                          <option value={"10"}>10</option>
                          <option value={"15"}>15</option>
                          <option value={"20"}>20</option>
                        </select>
                      </div> */}
                    </div>
                    <div className="table-responsive">
                      <CompanyTable
                        setShowOverLay={setShowOverLay}
                        setCompany={setCompany}
                        setId={setId}
                      />
                    </div>

                    {/* <div className="card-footer">
                      <button onClick={handlePrevious} className="btn btn-info">
                        Previous
                      </button>
                      {currentPage}
                      <button onClick={handleNext} className="btn btn-info">
                        Next
                      </button>
                    </div> */}
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

export default Companies;
