import React from "react"


import {auth, dbRef, db} from '../setupFirebase'

class signUp extends React.Component {
    inputStyle = this.props.inputStyle;
  
    state = {
      nick: "",
      email: "",
      password: ""
    };
  
    handleSubmit = e => {
      e.preventDefault();
      this.register();
    };
  
    register = () => {
      console.log();
      auth
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(function() {
          let id = Date.now()
          
          db.ref("users/" + id).set({
            id: id,
            nick: document.querySelector("#nick").value,
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value,
            admin: false,
            wins: 0
            
          });
        })
        
    };
  
    addUserToDatabase = () => {
      let newUser = {
        
        nick: document.querySelector("#nick").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
        admin: false,
        wins: 0
      };
  
      dbRef.child("pika-users/").push(newUser, function() {
        console.log("done");
      });
    };
  
    handleChange = e => {
      this.setState({ [e.target.id]: e.target.value });
      console.log(this.state)
    };
  
    addUserData = () => {
      console.log("ok");
      db.ref("pika-users/" + Date.now()).set({
        userId: Date.now(),
        nick: this.state.nick,
        email: this.state.email,
        password: this.state.password,
        isAdmin: false,
        wins: 0,
        som: "dsad"
      });
    };
  
    render() {
      
  
      return (
        <div className="SignUp">
          <div className="SignUp-head">
            <p>Sign up</p>
          </div>
          <div className="SignUp-form">
            <form>
              <input
                style={{ margin: 8 }}
                className="acces-input"
                label="Nick"
                placeholder='Name'
                id="nick"
                onChange={this.handleChange}
              />
              <input
                style={{ margin: 8 }}
                className="acces-input"
                label="Email"
                placeholder='Email'
                id="email"
                onChange={this.handleChange}
              />
              <input
                style={{ margin: 8 }}
                className="acces-input"
                label="Password"
                placeholder='Password'
                id="password"
                onChange={this.handleChange}
              />
              <div className="SignUp-holder-button">
                <button onClick={this.handleSubmit} text="Signup">Register</button>
              </div>
            </form>
          </div>
        </div>
    )
  }
}

export default signUp