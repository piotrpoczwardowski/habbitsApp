import React from "react"
import { getUserHabbits, addHabbit, deleteHabbit } from "../service/fetching"
import { auth, dbRef, db } from "../setupFirebase"

class name extends React.Component {
  state = {
    userId: "",
    userHabbits: [],
  }

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
    let positiveHabbits = this.state.userHabbits.filter(
      habbit => habbit.isPositive === "true"
    )
    let negativeHabbits = this.state.userHabbits.filter(
      habbit => habbit.isPositive === "false"
    )
    let negativeHabbitsDate = negativeHabbits.map(habbit =>
      Object.entries(habbit.date).map(([id, value]) => ({ id, ...value }))
    )
    let negativeHabbitsDateisDone = negativeHabbitsDate.map(dates => dates.filter(date => date.isDone))
    var now = new Date()

    return <div>{console.log(now)}</div>
  }
}

export default name
