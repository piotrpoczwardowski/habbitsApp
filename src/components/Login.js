import React from "react"
import SignUp from "../components/SignUp"
import SignIn from "../components/SignIn"
import { auth, dbRef, db } from "../setupFirebase"
import "../components/Login.css"

class Login extends React.Component {
  state = {
    open: 1,
  }
  changeCards = e => {
    if (e.target.innerText === "Login") {
      this.setState({ open: 1 })
    }
    if (e.target.innerText === "Register") {
      this.setState({ open: 0 })
    }
  }

  render() {
    return (
      <div className="login">
       {this.state.open === 0 && <SignUp />}
        {this.state.open === 1 && <SignIn />}
        <div className="sign__btns">
        <button className='btn sign__btn' onClick={this.changeCards}>Login</button>{" "}
        <button className='btn sign__btn' onClick={this.changeCards}>Register</button>
       
        </div>
      
      </div>
    )
  }
}

export default Login

// import React from "react"

// import { auth, dbRef, db } from "../setupFirebase"

// class name extends React.Component {
//   state = {}

//   render() {
//     return <div />
//   }
// }

// export default name
