import React from "react"

import { auth, dbRef, db } from "../setupFirebase"

class MyHabbits extends React.Component {
  state = {
    newHabbit : ''
  }
 
handleChange= (e) => {
  this.setState({newHabbit: e.target.value})
}
handleSubmit = (e, userId) => {
  e.preventDefault()
  

  db.ref(`users/${userId}/habbits/${Date.now()}` ).set(this.state.newHabbit);

}
deleteHabbit = (habbitId, userId) => {
  console.log(habbitId, userId)
  fetch(`https://obshab.firebaseio.com/users/${userId}/habbits/${habbitId}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
}


  render() {

    

   let userId = this.props.state.currentUserData.id
   let userHabbits = this.props.state.userHabbits
   
    return <div>
      <form action="">
       <input onChange={this.handleChange} type="text"/>
       <button onClick ={(e) =>this.handleSubmit(e, userId)}>Add</button>
      
       </form>
       {Object.values(userHabbits).map(habbit => <li key={habbit.key}> {habbit.value} <button onClick={()=>this.deleteHabbit(habbit.key, userId)}>DELETE</button> </li>)}
      
        
    </div>
  }
}

export default MyHabbits