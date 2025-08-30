import { Link } from "react-router-dom";

const Header = ({user,onLogout }) => {
    return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Code Pulse
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
                        </li>
                      
                        
                        <li className="nav-item">
                    <Link className="nav-link active" to="/categories">
                      Categories
                    </Link>
                  </li>

            {/* Show Admin menu only for Writers */}
            {user && user.roles?.includes("Writer") && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin
                </a>
                <ul className="dropdown-menu">
                  {/* <li>
                    <Link className="dropdown-item" to="/categories">
                      Categories
                    </Link>
                  </li> */}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/blogposts">
                      BlogPosts
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>

        <div className="d-flex">
          {!user ? (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          ) : (
            <div className="d-flex align-items-center">
              <span>{user.email}</span>
              <button className="btn btn-primary ms-3" onClick={onLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;