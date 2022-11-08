import { useState } from "react";
import ComposeMailForm from "./compose-mail/ComposeMailForm";

const ComposeMail = () => {
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Compose</h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* /.col */}
            <div className="col">
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <h3 className="card-title">Compose New Message</h3>
                </div>
                {/* /.card-header */}
                <ComposeMailForm />
                {/* /.card-footer */}
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
  );
};

export default ComposeMail;
