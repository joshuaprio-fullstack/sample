import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { useAuthContext } from "../../hooks/useAuthContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const ComposeMailForm = () => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [sender, setSender] = useState("");
  const [receivers, setReceivers] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSend = async () => {
    setIsLoading(true);

    const email_args = {
      sender: sender,
      receivers: receivers,
      subject: subject,
      text: message,
      html: message,
      date: new Date(),
      sent: true,
    };

    const response = await fetch(process.env.REACT_APP_BACKEND + "send-email", {
      method: "POST",
      body: JSON.stringify(email_args),
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });

    const email = await response.json();

    if (response.ok) {
      setIsLoading(false);
      navigate("/mail/sent");
    }

    if (!response.ok) {
      setError(email.error);
      setIsLoading(false);
    }
  };

  const handleSendLater = async () => {
    const email_args = {
      sender: sender,
      receivers: receivers,
      subject: subject,
      text: message,
      html: message,
      date: date,
      sent: false,
    };

    const response = await fetch(
      process.env.REACT_APP_BACKEND + "send-scheduled-email",
      {
        method: "POST",
        body: JSON.stringify(email_args),
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const email = await response.json();

    console.log(email);

    if (response.ok) {
      navigate("/mail/scheduled");
    }
  };

  return (
    <div>
      <div className="card-body">
        <div className="form-group">
          <input
            className="form-control"
            required
            placeholder="From: <Name> <email>"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            multiple
            required
            className="form-control"
            placeholder="To: "
            value={receivers}
            onChange={(e) => setReceivers(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Subject:"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <ReactQuill theme="snow" value={message} onChange={setMessage} />
        </div>
      </div>
      {/* /.card-body */}
      <div className="card-footer">
        <div className="d-flex flex-row-reverse">
          {!isLoading && (
            <button
              onClick={handleSend}
              type="submit"
              className="btn btn-primary"
            >
              <i className="far fa-envelope" /> Send Now
            </button>
          )}
          {isLoading && (
            <div>
              <img
                src="/loading.gif"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
                className="img-responsive"
              />
              <h6 style={{ color: "blue" }}>Sending...</h6>
            </div>
          )}
          {error && (
            <div style={{ marginRight: "10px" }} className="alert alert-danger">
              {error}
            </div>
          )}
        </div>
      </div>
      <div className="card-footer">
        <div className="float-right">
          <DateTimePicker
            onChange={setDate}
            value={date}
            minDate={new Date()}
          />
          <button
            onClick={handleSendLater}
            style={{ marginLeft: "10px" }}
            type="submit"
            className="btn btn-success"
          >
            <i className="far fa-envelope" /> Send Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComposeMailForm;
