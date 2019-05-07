import React from "react"

import { auth, dbRef, db } from "../setupFirebase"

class name extends React.Component {
  state = {
    email: "",
    password: "",
  }

  handleSubmit = e => {
    e.preventDefault()
    this.login()
  }
  login = () => {
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  render() {
    return (
      <div className="sign">
        <div className="title">
          Sign In
        </div>
       
          <form className="sign__form">
            <input
              
              className='inp'
              label="Email"
              placeholder="Email"
              id="email"
              onChange={this.handleChange}
            />
            <input
              className='inp'
             
              label="Password"
              placeholder="Password"
              id="password"
              onChange={this.handleChange}
            />
            <div className="sign__button">
              <button className='btn' onClick={this.handleSubmit} type="submit" text="Login">
                {" "}
                Login
              </button>
            </div>
          </form>
        
      </div>
    )
  }
}

export default name
