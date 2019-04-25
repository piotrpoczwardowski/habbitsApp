import React from "react"
import {navigate} from 'gatsby'
import { auth, dbRef, db } from "../setupFirebase"

class main extends React.Component {
  state = {}

  componentDidMount(){
  
    
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        
        console.log(firebaseUser)
       
        
       
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

  render() {
    return <div>
        Main
        <button onClick={this.logout}>Logout</button>
    </div>
  }
}

export default main