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
    let negativeHabbitsDateisDone = negativeHabbitsDate.map(dates =>
      dates.filter(date => date.isDone)
    )
    var now = new Date()
    now.setHours(0, 0, 0, 0)
    let splitNow = `${now}`.split(" ")
    let nowDay = splitNow[2]
    let nowMonth = splitNow[1]
    let nowYear = splitNow[3]

    let numberOfAllNegativeHabbits = negativeHabbits.length

    let negativeHabbitsDoneToday = 0
    let negativeHabbitsDoneMonth = 0
    let negativeHabbitsDoneYear = 0
    negativeHabbitsDateisDone.map(dates => dates.map(countNegative))
    function countNegative(date) {
      let dateDay = date.id.split(" ")[2]
      let dateMonth = date.id.split(" ")[1]
      let dateYear = date.id.split(" ")[3]
      console.log()
      if (dateYear === nowYear) {
        negativeHabbitsDoneYear ++
        if(dateMonth === nowMonth){
          negativeHabbitsDoneMonth++
          if(dateDay === nowDay){
            negativeHabbitsDoneToday++
          }
        }
      }
    }
    return <div>{console.log(negativeHabbitsDoneToday)}</div>
  }
}

export default name
