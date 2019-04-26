import React from "react"
import {navigate} from 'gatsby'
import { auth, dbRef, db } from "../setupFirebase"

class main extends React.Component {
  state = {
      user:{},
      allUsersData:{},
      currentUserData: {}
  }
  componentWillMount(){
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.setState({user:firebaseUser})
        
        fetch("https://obshab.firebaseio.com/users.json")
      .then(resp => resp.json())
      .then(x => Object.values(x).map(user => {
        if(user.email === firebaseUser.email){
          this.setState({currentUserData: user})
        }
      }))
        
        
       
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
// this.state.allUsersData.map(x => {
//   if(x.email === this.state.user.email){
//     console.log(x)
//   }
// })      
console.log(this.state)

  }

  render() {
    let email = 'email'
    
    return <div>
        
        <button onClick={this.logout}>Logout</button>
        <button onClick={this.show}>show</button>
         <p>{this.state.user.email}</p>
         <p>{this.state.currentUserData.nick}</p>
        Main

    </div>
  }
}

export default main