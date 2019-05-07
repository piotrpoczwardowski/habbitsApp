import React from "react"
import { getUserHabbits, addHabbit, deleteHabbit } from "../service/fetching"
import { auth, dbRef, db } from "../setupFirebase"
import "../components/Habbits.css"
import Bounce from 'react-reveal/Bounce';

class Habbits extends React.Component {
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
  findHabbit = (habbit, day) => {
    let habbitDate = Object.entries(habbit.date || {}).map(([id, isDone]) => ({
      id,
      ...isDone,
    }))
    let isDone = habbitDate.some(
      habbit => habbit.id === `${day.date}` && habbit.isDone
    )

    return isDone
  }
  handleClick = (e, cellId, habbitId) => {
    console.log()
    let isDone = e.currentTarget.classList.contains("done")  
    this.toggleDone(this.state.userId, habbitId, cellId, isDone).then(() =>
      this.getUserHabbits(this.state.userId)
    )
  }

  toggleDone = (userId, habbitId, cellId, isDone) =>
    fetch(
      `https://obshab.firebaseio.com/users/${userId}/habbits/${habbitId}/date/${cellId}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          isDone: !isDone,
        }),
      }
    )

    // click = (e) => {
    //   console.log(e)
    // }

  render() {
    let now = new Date()
    let currentDay = now.getDate()
    let currentMonth = now.getMonth()
    let sevenDays = []
    const monthNames = [
      "styczeń",
      "luty",
      "marzec",
      "kwiecień",
      "maj",
      "czerwiec",
      "lipiec",
      "sierpień",
      "wrzesień",
      "październik",
      "listopad",
      "grudzień",
    ]
    for (let i = -2; i < 3; i++) {
      let day = { date: new Date() }
      day.date.setDate(day.date.getDate() + i)
      day.date.setHours(0, 0, 0, 0)
      sevenDays.push(day)
    }

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              {sevenDays.map(day => (
                <th className={currentDay === day.date.getDate() && 'today'}>
                  {day.date.getDate()} {monthNames[day.date.getMonth()]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.userHabbits.map(habbit => (
              <tr key={habbit.id}>
                <td>{habbit.name}</td>
                {sevenDays.map(day => (
                  <td
                    onClick={e => this.handleClick(e, day.date, habbit.id)}
                    className={
                      this.findHabbit(habbit, day) ? "done" : undefined
                    }
                  >
                   
                    <span onClick={this.click}
                      className={
                        this.findHabbit(habbit, day)
                          ? habbit.isPositive === "true"
                            ? "circle green"
                            : "circle red"
                          : undefined
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Habbits
