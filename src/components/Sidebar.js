import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { user } = useAuthContext();

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="" className="brand-link elevation-4">
        <span className="brand-text font-weight-light">CMS</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="info">
            {user && (
              <Link to="#" className="d-block">
                {user.email}
              </Link>
            )}
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li class="nav-header">Shortcuts</li>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Dashboard</p>
              </Link>
            </li>
            {/* Companies */}
            <li className="nav-item">
              <Link to="companies" className="nav-link">
                <i class="nav-icon fa-solid fa-building"></i>
                <p>Companies</p>
              </Link>
            </li>
            {/* Employees */}
            <li className="nav-item">
              <Link to="employees" className="nav-link">
                <i class="nav-icon fa-solid fa-person-walking-luggage"></i>
                <p>Employees</p>
              </Link>
            </li>
            {/* Mails */}
            {user.isAdmin && <li class="nav-header">Mail</li>}

            {user.isAdmin && (
              <li className="nav-item">
                <Link to="mail" className="nav-link">
                  <i class="nav-icon fa-solid fa-envelope"></i>
                  <p>Compose Mail</p>
                </Link>
              </li>
            )}

            {user.isAdmin && (
              <li className="nav-item">
                <Link to="mail/sent" className="nav-link">
                  <i class="nav-icon fa-solid fa-envelope-open"></i>
                  <p>Sent Mails</p>
                </Link>
              </li>
            )}

            {user.isAdmin && (
              <li className="nav-item">
                <Link to="mail/scheduled" className="nav-link">
                  <i class="nav-icon fa-solid fa-clock"></i>
                  <p>Scheduled Mails</p>
                </Link>
              </li>
            )}
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
};

export default Sidebar;
