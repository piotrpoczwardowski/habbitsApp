import React from "react"

import { auth, dbRef, db } from "../setupFirebase"

class MyHabbits extends React.Component {
  state = {
    newHabbit : ''
  }
 
handleChange= (e) => {
  this.setState({newHabbit: e.target.value})
}
handleSubmit = (e) => {
  e.preventDefault()
  

  db.ref(`users/${this.props.currentUserData.id}/habbits/${Date.now()}` ).set(this.state.newHabbit);
  
}



  render() {

    

   let habbits = this.props.currentUserData.habbits
    return <div>
      <form action="">
       <input onChange={this.handleChange} type="text"/>
       <button onClick ={this.handleSubmit}>Add</button>
       
       </form>
       
       {Object.values(habbits).map(x => <p>{x}</p>)}
        
    </div>
  }
}

export default MyHabbits