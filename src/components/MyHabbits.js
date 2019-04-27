import React from "react"
import { getUserHabbits, addHabbit, deleteHabbit } from "../service/fetching"
import { auth, dbRef, db } from "../setupFirebase"

class MyHabbits extends React.Component {
  state = {
    userHabbits: [],
    newHabbit: "",
    userId: "",
  }
  getUserHabbits = userId => {
    getUserHabbits(userId).then(habbits =>
      this.setState({ userHabbits: habbits })
    )
  }

  componentWillMount() {
    let userId = this.props.state.currentUserData.id
    this.setState({ userId: userId })

    this.getUserHabbits(userId)
  }

  handleChange = e => {
    this.setState({ newHabbit: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault()

    let id = Date.now()
    addHabbit(this.state.newHabbit, this.state.userId, id).then(() =>
      this.getUserHabbits(this.state.userId)
    )
  }
  handleDelete = habbitId => {
   
    deleteHabbit(this.state.userId, habbitId).then(() =>
      this.getUserHabbits(this.state.userId)
    )
  }



  render() {
    let userId = this.props.state.currentUserData.id
    let userHabbits = this.props.state.userHabbits

    return (
      <div>
        <form action="">
          <input onChange={this.handleChange} type="text" />
          <button onClick={e => this.handleSubmit(e)}>Add</button>
        </form>
        {this.state.userHabbits.map(x => (
          <li key={x.id}>
            {x.name}{" "}
            <button onClick={() => this.handleDelete(x.id)}>Delete</button>
          </li>
        ))}
      </div>
    )
  }
}

export default MyHabbits
