import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      redirect: false,
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  
  handleSubmit = async (e) => {
    console.log(this.state)
    e.preventDefault();
    const { email, password } = this.state;
    let login = await fetch('http://localhost:8000/users/login', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
    login = await login.json()
    if (login.message) {
      alert(login.message)
    }else if (login.error) {
      alert(login.error)
    } else if(login.token){
      this.props.setToken(login.token)
      localStorage.setItem('token',login.token)
      this.setState({ redirect: true })
    }
  };

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };


  render() {
    if (this.state.redirect) {
      return <Navigate to="/profile"/>;
    }
    return (
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h2 className="mt-4">Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group mt-3">
            <label htmlFor="email">Enter your email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
              placeholder='...'
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Enter your password</label>
            <div className="input-group">
              <input
                type={this.state.showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                name="password"
                placeholder='...'
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.togglePasswordVisibility}
                >
                  {this.state.showPassword ? 'Hide' : 'View'}
                </button>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;