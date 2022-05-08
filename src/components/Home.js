import React, { Component } from "react";
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { PostsList } from "./";

class Home extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="home">
        <PostsList posts={posts} />
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     posts: state.posts,
//   };
// }

// Home.propTypes = {
//   posts: PropTypes.array.isRequired,
// };

// export default connect(mapStateToProps)(Home);

export default Home;
