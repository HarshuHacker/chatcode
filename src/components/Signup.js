import React from "react";

class Signup extends React.Component {
  render() {
    return (
      <form className="login-form">
        <span className="login-signup-header">Signup</span>

        <div className="field">
          <input placeholder="Name" type="text" required />
        </div>

        <div className="field">
          <input placeholder="Email" type="email" required />
        </div>

        <div className="field">
          <input placeholder="Confirm password" type="password" required />
        </div>

        <div className="field">
          <input placeholder="Password" type="password" required />
        </div>

        <div className="field">
          <button>Signup</button>
        </div>
      </form>
    );
  }
}

export default Signup;
