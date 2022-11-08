import { useEffect } from "react";
import useFetchEmails from "../hooks/useFetchEmails";
import { Markup } from "interweave";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const SentMails = () => {
  const { fetchEmails, emails } = useFetchEmails();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmails(true);
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const formatDate = (email_date) => {
    return format(new Date(email_date), "MMM. dd, yyyy hh:mm aaaa");
  };

  return (
    <div className="content-wrapper">
      {/* Main content */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Sent Mails</h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>

      <section className="content">
        <div className="row">
          <div className="col-md-3">
            <Link
              to={{ pathname: "/mail" }}
              className="btn btn-primary btn-block mb-3"
            >
              Compose
            </Link>
          </div>
          {/* /.col */}
          <div className="col-md-9">
            <div className="card card-primary card-outline">
              <div className="card-header">
                <h3 className="card-title">Mails</h3>
              </div>
              {/* /.card-header */}
              <div className="card-body p-0">
                <div className="table-responsive mailbox-messages">
                  <table className="table table-hover table-striped">
                    <tbody>
                      {emails &&
                        emails.map((email) => (
                          <tr
                            style={{ cursor: "pointer" }}
                            onClick={(e) => navigate(`/mail/${email._id}`)}
                          >
                            <td className="mailbox-name">
                              <b>{email.subject}</b>
                            </td>
                            <td className="mailbox-subject">
                              <Markup content={truncate(email.html, 100)} />
                            </td>
                            <td className="mailbox-attachment" />
                            <td className="mailbox-date">
                              {formatDate(email.date)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {/* /.table */}
                </div>
                {/* /.mail-box-messages */}
              </div>
              {/* /.card-body */}
              <div className="card-footer p-0"></div>
            </div>
            {/* /.card */}
          </div>
          {/* /.col */}
        </div>
        {/* /.row */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default SentMails;
