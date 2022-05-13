import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";

import { fetchPosts } from "../actions/posts";
import { Home, Navbar, Login, Signup, Settings, UserProfile } from "./";
import Page404 from "./Page404";
import jwt_decode from "jwt-decode";
import { authenticateUser } from "../actions/auth";
import { Navigate } from "react-router-dom";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";
import { fetchUserFriends } from "../actions/friends";
import { useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children, isLoggedin }) => {
  const state = useLocation();
  const navigate = useNavigate();
  console.log("STATE : ", state);
  // const { isLoggedin, path, component: Component } = privateRouteProps;

  // return (
  //   <Route
  //     path={path}
  //     render={(props) => {
  //       return isLoggedin ? (
  //         <Component {...props} />
  //       ) : (
  //         <Navigate
  //           to={{
  //             pathname: "/login",
  //             state: {
  //               from: props.location,
  //             },
  //           }}
  //         />
  //       );
  //     }}
  //   />
  // );

  return isLoggedin
    ? children
    : navigate("/login", {
        state,
      });

  // return isLoggedin ? children : <Navigate to={"/login"}/>
};

class App extends React.Component {
  componentDidMount() {
    // Fetch the posts through API call
    this.props.dispatch(fetchPosts());

    const token = getAuthTokenFromLocalStorage();

    if (token) {
      const user = jwt_decode(token);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );

      this.props.dispatch(fetchUserFriends());
    }
  }

  render() {
    const { posts, auth, friends } = this.props;
    return (
      <Router>
        <div>
          <Navbar />

          <Routes>
            {/* <Route
              exact
              path="/"
              render={(props) => {
                return (
                  <Home
                    {...props}
                    posts={posts}
                    friends={friends}
                    isLoggedin={auth.isLoggedin}
                  />
                );
              }}
            /> */}
            <Route
              path="/"
              element={
                <Home
                  posts={posts}
                  friends={friends}
                  isLoggedin={auth.isLoggedin}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <PrivateRoute
              path="/settings"
              element={<Settings/>}
              isLoggedin={auth.isLoggedin}
            /> */}
            <Route
              path="/settings"
              element={
                <PrivateRoute isLoggedin={auth.isLoggedin}>
                  {" "}
                  <Settings />{" "}
                </PrivateRoute>
              }
            />

            <Route
              path="/user/:userId"
              element={
                <PrivateRoute isLoggedin={auth.isLoggedin}>
                  {" "}
                  <UserProfile />{" "}
                </PrivateRoute>
              }
            />

            {/* <PrivateRoute
              path="/user/:userId"
              element={<UserProfile/>}
              isLoggedin={auth.isLoggedin}
            /> */}
            <Route element={<Page404 />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
    friends: state.friends,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
