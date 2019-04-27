import React from "react"
import {navigate} from 'gatsby'
import { auth, dbRef, db } from "../setupFirebase"
import MyHabbits from '../components/MyHabbits'

class main extends React.Component {
  state = {
      user:{},
      allUsersData:{},
      currentUserData: {},
      isLoading: true,
      userHabbits: []
      
  }
  componentWillMount(){
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.setState({user:firebaseUser})
        
        fetch("https://obshab.firebaseio.com/users.json")
      .then(resp => resp.json())
      .then(x => Object.values(x).map(user => {
        if(user.email === firebaseUser.email){
          this.setState({currentUserData: user,
          isLoading:false})
        }
      }))
      // this.updateCurrentUser(firebaseUser)
     
       
      } else {
        console.log("no-user");
        navigate('/')
      }
    });
    

     
  }
  
  // updateCurrentUser = (firebaseUser) => {
  //   dbRef.child("users/").on("child_added", snap => {
      
     

  //     if(firebaseUser.email === snap.val().email){
  //       this.setState({currentUserData: snap.val(),
  //       isLoading: false})
  //       let ar = []
  //       dbRef.child(`users/${snap.val().id}/habbits`).on('child_added', snapi => {
  //         let key= snapi.key
  //         let value = snapi.val()
  //         let obj = {key, value}
          
  //         ar.push(obj)
  //         this.setState({userHabbits: ar})
         
          
  //       })
  //     }
  //   });
    
  // }
  
  

  logout = () => {
    auth.signOut()
    navigate('/')
  }
  show = () => {
console.log(Object.values(this.state.userHabbits).map(x => x.key))
   
    
    // dbRef.child("uzers/").on("child_added", snap => {
      
    //  ar.push(snap.val())
    //   this.setState({test: ar})
    //   console.log(this.state.test)
    // });
    // dbRef.child('users/').on('child_added', function(x){
    //   console.log(x.val())
    //   this.setState({snapUsers: x.val()})
     
    // })

  }

  render() {
    
    
    return <div>
        
        <button onClick={this.logout}>Logout</button>
        <button onClick={this.show}>show</button>
         <p>{this.state.user.email}</p>
         <p>{this.state.currentUserData.nick}</p>
         
         
         
         {this.state.isLoading? 'load': <div><MyHabbits  state={this.state}/>
           
           </div>}

           
        
 
    </div>
  }
}

export default main