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
    let positiveHabbitsDate = positiveHabbits.map(habbit =>
      Object.entries(habbit.date).map(([id, value]) => ({ id, ...value }))
    )
    let negativeHabbitsDate = negativeHabbits.map(habbit =>
      Object.entries(habbit.date).map(([id, value]) => ({ id, ...value }))
    )
    let positiveHabbitsDateisDone = positiveHabbitsDate.map(dates =>
      dates.filter(date => date.isDone)
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

      if (dateYear === nowYear) {
        negativeHabbitsDoneYear++
        if (dateMonth === nowMonth) {
          negativeHabbitsDoneMonth++
          if (dateDay === nowDay) {
            negativeHabbitsDoneToday++
          }
        }
      }
    }
  
 
    let positiveHabbitsDoneToday = 0
    let positiveHabbitsDoneMonth = 0
    let positiveHabbitsDoneYear = 0
    positiveHabbitsDateisDone.map(dates => dates.map(countPositive))
    function countPositive(date) {
      let dateDay = date.id.split(" ")[2]
      let dateMonth = date.id.split(" ")[1]
      let dateYear = date.id.split(" ")[3]
      console.log()
      if (dateYear === nowYear) {
        positiveHabbitsDoneYear++
        if (dateMonth === nowMonth) {
          positiveHabbitsDoneMonth++
          if (dateDay === nowDay) {
            positiveHabbitsDoneToday++
          }
        }
      }
    }
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Period </th>
              <th>Positive</th>
              <th>Negative</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Today</td>
              <td>{positiveHabbitsDoneToday}</td>
              <td>{negativeHabbitsDoneToday}</td>
            </tr>
            <tr>
              <td>Month</td>
              <td>{positiveHabbitsDoneMonth}</td>
              <td>{negativeHabbitsDoneMonth}</td>
            </tr>
            <tr>
              <td>Year</td>
              <td>{positiveHabbitsDoneYear}</td>
              <td>{negativeHabbitsDoneYear}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default name
