import React from "react"
import {navigate} from 'gatsby'
import { auth, dbRef, db } from "../setupFirebase"

class main extends React.Component {
  state = {
      user:{}
  }
  componentWillMount(){
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.setState({user:firebaseUser})
        
        
        
       
      } else {
        console.log("no-user");
        navigate('/')
      }
    });
  }

  
  

  logout = () => {
    auth.signOut()
    navigate('/')
  }
  show = () => {
      console.log(this.state.user)
  }

  render() {
    let email = 'email'
    
    return <div>
        
        <button onClick={this.logout}>Logout</button>
        <button onClick={this.show}>show</button>
         <p>{this.state.user.email}</p>
        Main

    </div>
  }
}

export default main