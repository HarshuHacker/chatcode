import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchPosts } from '../actions/posts';
import { Home, Navbar, Page404, Login, Signup } from './';

// import { Home, Navbar } from './';
// import {Page404} from "./Page404"

// Dummy component to understand routing in react
// const Login = () => <div>Login</div>
// const Login = (props) => {
//   console.log("Props : ",props)
//   return (
//     <div>Login</div>
//   )
// }
// const Signup = () => <div>Signup</div>;

class App extends React.Component {
  componentDidMount() {
    // Fetch the posts through API call
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;
    return (
      <Router>
        <div>
          <Navbar />

          <Switch>
            <Route 
              exact 
              path="/" render={(props) => {
                return <Home {...props} posts={posts}/>
              }}/>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route component={Page404}/>
          </Switch>

        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
