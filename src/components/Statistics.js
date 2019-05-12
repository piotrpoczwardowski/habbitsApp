import React from "react"
import { getUserHabbits, addHabbit, deleteHabbit } from "../service/fetching"
import { auth, dbRef, db } from "../setupFirebase"

class name extends React.Component {
  state = {}


  getUserHabbits = userId => {
    getUserHabbits(userId).then(habbits => {
      this.setState({ userHabbits: habbits })
     
    })
  }

  componentWillMount() {
    let userId = this.props.state.currentUserData.id
    this.setState({ userId: userId })

    this.getUserHabbits(userId)
  }

  render() {
   


    return <div >{console.log(this.state)}</div>
  }
}

export default name
