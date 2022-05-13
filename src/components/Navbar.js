import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/auth";
import { searchUsers } from "../actions/search";
import Icon from "../assets/Images/Icon.png";

class Navbar extends Component {
  logOut = () => {
    localStorage.removeItem("token");
    this.props.dispatch(logoutUser());
  };

  handleSearch = (e) => {
    const searchText = e.target.value;

    this.props.dispatch(searchUsers(searchText));
  };

  render() {
    const { auth, results } = this.props;
    return (
      <nav className="nav">
        <div className="left-div">
          <Link to="/">
            <img src={Icon} height="50px" width="207px" alt="logo" />
          </Link>
        </div>
        <abbr
          title={auth.isLoggedin ? "" : "Login First"}
          style={{ textDecoration: "none" }}
        >
          <div className="search-container">
            <img
              className="search-icon"
              src="https://cdn-icons-png.flaticon.com/512/751/751463.png"
              alt="search-icon"
            />

            {auth.isLoggedin ? (
              <input placeholder="Search" onChange={this.handleSearch} />
            ) : (
              <input
                disabled
                placeholder="Search"
                onChange={this.handleSearch}
              ></input>
            )}

            {results.length > 0 && (
              <div className="search-results">
                <ul>
                  {results.map((user) => (
                    <Link to={`/user/${user._id}`} key={user._id}>
                      <li className="search-results-row">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/1864/1864509.png"
                          alt="user-dp"
                        />
                        <span>{user.name}</span>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </abbr>
        <div className="right-nav">
          {auth.isLoggedin && (
            <div className="user">
              <Link to="/settings">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1864/1864509.png"
                  alt="user-dp"
                  id="user-dp"
                />
                <span>{auth.user.name}</span>
              </Link>
            </div>
          )}

          <div className="nav-links">
            <ul>
              {!auth.isLoggedin && (
                <li>
                  <Link to="/login">Log in</Link>
                </li>
              )}

              {auth.isLoggedin && <li onClick={this.logOut}>Log out</li>}

              {!auth.isLoggedin && (
                <li>
                  <Link to="signup">Register</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    results: state.search.results,
  };
}

export default connect(mapStateToProps)(Navbar);
