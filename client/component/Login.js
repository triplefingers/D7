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
      this.props.goto("/home");
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
      username : this.state.username,
      password: this.state.password,
    }).then((res) => {
      console.log("Signup & login success: ", res);
      this.props.goto("/home");
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
        <div>
          <h1>Login</h1>
          <form onSubmit={this.login.bind(this)}>
            <label for="email">Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange.bind(this, "email")} required/><br />
            <label for="password">Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange.bind(this, "password")} required/><br />
            <button type="submit">로그인하기</button>
          </form>
          <button onClick={this.setState.bind(this, {isSignup:true})}>회원가입</button>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Signup</h1>
          <form onSubmit={this.signup.bind(this)}>
            <label for="email">Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange.bind(this, "email")} required/><br />
            <label for="username">Username</label>
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange.bind(this, "username")} required/><br />
            <label for="password">Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange.bind(this, "password")} required/><br />
            <button type="submit">회원 가입하기</button>
          </form>
        </div>
      );
    }
  }

}

export default Login;