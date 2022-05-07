import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props)
    this.emailImputRef = React.createRef()
    this.passwordImputRef = React.createRef()
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    console.log("this.emailImputRef : ", this.emailImputRef)
    console.log("this.passwordImputRef : ", this.passwordImputRef)
  }
  render() {
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        <div className="field">
          <input type="email" placeholder="Email" required ref={this.emailImputRef}/>
        </div>
        <div className="field">
          <input type="password" placeholder="Password" required ref={this.passwordImputRef}/>
        </div>
        <div className="field">
          <button onClick={this.handleFormSubmit}>Log In</button>
        </div>
      </form>
    );
  }
}

export default Login;
