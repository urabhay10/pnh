import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Aboutpage from './components/Aboutpage'
import Profile from './components/Profile'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }
  setToken = (newToken) => {
    this.setState({ token: newToken });
  }
  render() {
    return (
      <div className='App'>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={this.state.token===''?<Home />:<Profile token={this.state.token}/>} />
            <Route exact path='/register' element={<Register setToken={this.setToken}/>}/>
            <Route exact path='/login' element={<Login setToken={this.setToken}/>}/>
            <Route exact path='/aboutpage' element={<Aboutpage />} />
            <Route path='/profile/*' element={<Profile  token={this.state.token}/>}/>
          </Routes>
        </Router>
      </div>
    )
  }
}