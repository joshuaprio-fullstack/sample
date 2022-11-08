import { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetchMeta from "../hooks/useFetchMeta";

const Dashboard = () => {
  const { fetchMeta, metaData } = useFetchMeta();

  useEffect(() => {
    fetchMeta();
  }, []);

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Dashboard</h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>

      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small card */}
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{metaData.employees}</h3>
                  <p>Employees</p>
                </div>
                <div className="icon">
                  <i className="fas fa-user-plus" />
                </div>
                <Link to="/employees" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small card */}
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{metaData.companies}</h3>
                  <p>Companies</p>
                </div>
                <div className="icon">
                  <i className="fas fa-chart-pie" />
                </div>
                <Link to="/companies" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
            {/* ./col */}
          </div>
          {/* /.row */}
          {/* Small Box (Stat card) */}
        </div>
      </section>
      {/* /.content */}
    </div>
  );
};

export default Dashboard;
