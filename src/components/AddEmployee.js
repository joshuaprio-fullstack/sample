import AddEmployeeForm from "./add-employee/AddEmployeeForm";

const AddEmployee = () => {
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Add New Employee</h1>
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
                <AddEmployeeForm />
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

export default AddEmployee;
