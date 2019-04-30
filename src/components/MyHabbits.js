import React from "react"
import { getUserHabbits, addHabbit, deleteHabbit } from "../service/fetching"
import { auth, dbRef, db } from "../setupFirebase"
import {Link} from 'gatsby'
class MyHabbits extends React.Component {
  state = {
    userHabbits: [],
    newHabbit: "",
    userId: "",
    side: "Positiv",
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
    addHabbit(
      this.state.newHabbit,
      this.state.userId,
      id,
      this.state.side
    ).then(() => this.getUserHabbits(this.state.userId))
  }
  handleDelete = habbitId => {
    deleteHabbit(this.state.userId, habbitId).then(() =>
      this.getUserHabbits(this.state.userId)
    )
  }
  selectChange = e => {
    this.setState({ side: e.target.value })
  }

  render() {
    let userId = this.props.state.currentUserData.id
    let userHabbits = this.props.state.userHabbits
   
    return (
      <div>
        <form action="">
          <select onChange={this.selectChange}>
            <option value="Positiv">Positiv</option>
            <option value="Negativ">Negativ</option>
          </select>
          <input onChange={this.handleChange} type="text" />
          <button onClick={e => this.handleSubmit(e)}>Add</button>
        </form>
        {this.state.userHabbits.map(habbit => (
          <li key={habbit.id}>
            {habbit.name}
            <button onClick={() => this.handleDelete(habbit.id)}>X</button>
            <button><Link state={{userId:this.state.userId,
            habbit: habbit }} to='/Calendar'> Calendar</Link></button>
          </li>
        ))}
      </div>
    )
  }
}

export default MyHabbits
