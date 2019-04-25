import React from "react"
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import { auth, dbRef, db } from "../setupFirebase"
import '../components/Login.css'

class Login extends React.Component {
  state = {
    open:1
  }

  render() {
    return <div>
      <button >Login</button> <button >Register</button>
      {this.state.open ===0&& <SignUp/> }
      {this.state.open ===1&& <SignIn/> }
    </div>
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