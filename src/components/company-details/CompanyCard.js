const CompanyCard = ({ isLoading, props_company }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          {isLoading && "Loading..."}
          {!isLoading && (
            <div>
              <h2>{props_company.name}</h2>
              <h6 style={{ color: "#00008B" }}>
                {"Company ID:" + props_company._id}
              </h6>
            </div>
          )}
        </div>
      </div>
      {/* /.card-header */}
      <div className="card-body d-flex align-items-center justify-content-center">
        {isLoading && <img className="img-responsive" src="/loading.gif" />}
        {!isLoading && (
          <img
            className="img-fluid"
            src={`${process.env.REACT_APP_BACKEND}/${props_company.logo}`}
            alt={`${props_company.name} Logo`}
          />
        )}
      </div>
    </div>
  );
};

export default CompanyCard;
