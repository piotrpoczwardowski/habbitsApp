import React from "react"
import {getUserHabbits} from '../service/fetching'
import { auth, dbRef, db } from "../setupFirebase"

class MyHabbits extends React.Component {
  state = {
    userHabbits:[]
  }
  getUserHabbits = (userId) => {
   
   let x = getUserHabbits(userId)
    // .then(userHabbits => {
    //   this.setState({userHabbits})
    // })
  }

  componentDidMount(){
    let userId = this.props.state.currentUserData.id
    this.getUserHabbits(userId)
  }
 
handleChange= (e) => {
  this.setState({newHabbit: e.target.value})
}
handleSubmit = (e, userId) => {
  e.preventDefault()
  

  db.ref(`users/${userId}/habbits/${Date.now()}` ).set(this.state.newHabbit);

}
// deleteHabbit = (habbitId, userId) => {
//   console.log(habbitId, userId)
//   fetch(`https://obshab.firebaseio.com/users/${userId}/habbits/${habbitId}.json`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });
// }


  render() {

    

   let userId = this.props.state.currentUserData.id
   let userHabbits = this.props.state.userHabbits
   
    return <div>
      <form action="">
       <input onChange={this.handleChange} type="text"/>
       <button onClick ={(e) =>this.handleSubmit(e, userId)}>Add</button>
     
       </form>
       
       <button onClick={()=> console.log(this.state)}></button>
        
    </div>
  }
}

export default MyHabbits