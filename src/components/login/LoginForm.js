import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="input-group-append">
          <div className="input-group-text">
            <span className="fas fa-envelope" />
          </div>
        </div>
      </div>
      <div className="input-group mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <div className="input-group-append">
          <div className="input-group-text">
            <span className="fas fa-lock" />
          </div>
        </div>
      </div>
      <div className="row">
        {/* /.col */}
        <div className="col">
          {!isLoading && (
            <button type="submit" className="btn btn-primary btn-block">
              Sign In
            </button>
          )}
          {isLoading && <img src="loading.gif" />}
        </div>
        {/* /.col */}
      </div>
      {error && (
        <div className="row">
          {/* /.col */}
          <div className="col">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
          {/* /.col */}
        </div>
      )}
    </form>
  );
};

export default LoginForm;
