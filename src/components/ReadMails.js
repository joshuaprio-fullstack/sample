import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { Markup } from "interweave";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const ReadMails = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState({});
  const navigate = useNavigate();

  const formatDate = (email_date) => {
    try {
      return format(new Date(email_date), "MMM. dd, yyyy hh:mm aaaa");
    } catch (error) {
      return "";
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchEmail = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND + "emails/" + id,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      const fetched_email = await response.json();

      if (response.ok) {
        setEmail(fetched_email);
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
      }
    };

    fetchEmail();
  }, []);

  const handleDelete = async (_id) => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND + `delete-email/${_id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    const email_company = await response.json();
    const sent = email_company.sent;

    if (response.ok) {
      if (sent) {
        navigate("/mail/sent");
      } else {
        navigate("/mail/scheduled");
      }
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Read Mail</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Compose</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              {email.sent && (
                <Link
                  to="/mail/sent"
                  className="btn btn-primary btn-block mb-3"
                >
                  Back to Sent Mails
                </Link>
              )}
              {!email.sent && (
                <Link
                  to="/mail/scheduled"
                  className="btn btn-primary btn-block mb-3"
                >
                  Back to Scheduled Mails
                </Link>
              )}
            </div>
            {/* /.col */}
            <div className="col-md-9">
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <h3 className="card-title">Read Mail</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body p-0">
                  <div className="mailbox-read-info">
                    <h5>{email.subject}</h5>
                    <h6>
                      To: {email.receivers}
                      <span className="mailbox-read-time float-right">
                        {!email.sent && "Scheduled to be sent: "}
                        {formatDate(email.date)}
                      </span>
                    </h6>
                  </div>
                  {/* /.mailbox-read-info */}
                  <div className="mailbox-read-message">
                    <Markup content={email.html} />
                  </div>
                  {/* /.mailbox-read-message */}
                </div>
                {/* /.card-body */}
                <div className="card-footer bg-white"></div>
                {/* /.card-footer */}
                <div className="card-footer">
                  {email.sent && (
                    <button
                      onClick={(e) => {
                        handleDelete(email._id);
                      }}
                      type="button"
                      className="btn btn-default"
                    >
                      <i className="far fa-trash-alt" /> Delete
                    </button>
                  )}
                  {!email.sent && (
                    <button
                      onClick={(e) => {
                        handleDelete(email._id);
                      }}
                      type="button"
                      className="btn btn-default"
                    >
                      <i className="far fa-trash-alt" /> Delete and Cancel Email
                    </button>
                  )}
                </div>
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

export default ReadMails;
