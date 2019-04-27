import React from "react"
import {getUserHabbits} from '../service/fetching'
import { auth, dbRef, db } from "../setupFirebase"

class MyHabbits extends React.Component {
  state = {
    userHabbits:[],
    newHabbit: ''
  }
  getUserHabbits = (userId) => {
   
   getUserHabbits(userId).then(habbits => 
  this.setState({userHabbits: habbits})
  )
    
  }

  componentWillMount(){
    let userId = this.props.state.currentUserData.id
    this.getUserHabbits(userId)
    console.log(this.props)
  }
 
handleChange= (e) => {
  this.setState({newHabbit: e.target.value})
}
handleSubmit = (e, userId) => {
  e.preventDefault()
  
let id = Date.now()
  db.ref(`users/${userId}/habbits/${id}` ).set({
    name: this.state.newHabbit,
    id: id
  });
  this.getUserHabbits(userId)

}
handleDelete = (habbitId) => {

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
     {Object.values(this.state.userHabbits || {}).map(habbit => 
       <li key={habbit.id}>{habbit.name} <button onClick={() =>this.handleDelete(habbit.id)}>DELETE</button></li>
     )}
       
       
    </div>
  }
}

export default MyHabbits