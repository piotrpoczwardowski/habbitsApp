import React from "react"

import { auth, dbRef, db } from "../setupFirebase"

class name extends React.Component {
    state = {
        email: '',
        password: ''
      }
     
      handleSubmit = (e)=> {
        e.preventDefault()
        this.login()
        
      } 
      login = () => {
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      }
    
      handleChange = (e) => {
        
        this.setState({[e.target.id]: e.target.value})
      }

  render() {
    return  (

        <div className="SignIn">
       
          <div className="SignIn-head">
            <p>Sign in</p>
          </div>
          <div className="SignIn-form">
          <form>
        
         <input
          style={{margin: 8}}
          className='acces-input'
          label="Email"
          placeholder="Email"
          id="email"
          onChange={this.handleChange}
          
          
          
        />
         <input
          style={{margin: 8}}
        className='acces-input'
          label="Password"
          placeholder="Password"
          id="password"
          onChange={this.handleChange}
          
        />
       <div className="SignIn-holder-button">
                <button onClick={this.handleSubmit} type='submit' text="Login"> Login
                </button>
              </div>
        </form>
          </div>
        </div>
      )
  }
}

export default name
