import React, {Component} from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignup: false,
    };
  };

  login(e) {
    e.preventDefault();
    axios.post("/api/login", {
      email : this.state.email,
      password: this.state.password
    }).then((res) => {
      console.log("Login success: ", res);
      this.props.goto("/");
    }).catch((err)=>{
      console.error("Error: Login failed: ", err);
      this.setState({
        email: "",
        password: ""
      });
      alert(err.data.message);
    });
  };

  signup(e) {
    e.preventDefault();
    axios.post("/api/signup", {
      email : this.state.email,
      username : this.state.name,
      password: this.state.password,
    }).then((res) => {
      console.log("Signup & login success: ", res);
      this.props.goto("/");
    }).catch((err)=>{
      console.error("Error: Signup failed: ", err);
      this.setState({
        email: "",
        password: "",
        username: ""
      });
    });
  };


  handleChange(what, event) {
    let data = {};
    data[what] = event.target.value;
    this.setState(data);
  };

  componentWillMount() {
    this.props.checkIfLogined();
  };

  render() {
    if(!this.state.isSignup){
      return (
        <div className="temp">
          <h1>D7</h1>
          <h4>Do something every single day</h4>
          <form onSubmit={this.login.bind(this)}>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange.bind(this, "email")} placeholder="email" required/><br />
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange.bind(this, "password")} placeholder="password" required/><br />
            <button type="submit">Login</button>
          </form>
          <p>
            <span>or login with:</span><br />
            <button type="button">Google</button>
          </p>
          <a onClick={this.setState.bind(this, {isSignup:true})}>Sign up for D7</a>
        </div>
      );
    } else {
      return (
        <div>
          <h1>D7</h1>
          <h4>Do something every single day</h4>
          <form onSubmit={this.signup.bind(this)}>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange.bind(this, "email")} placeholder="email" required/><br />
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange.bind(this, "password")} placeholder="password" required/><br />
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange.bind(this, "name")} placeholder="name" required/><br />
            {/**/}
            <label><input type="checkbox" defaultChecked="true" />Agree for terms of use</label><br/>
            <button type="submit">Sign up & Login</button>
          </form>
        </div>
      );
    }
  }

}

export default Login;