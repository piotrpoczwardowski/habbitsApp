import React from "react"
import { getUserHabbits, addHabbit, deleteHabbit } from "../service/fetching"
import { auth, dbRef, db } from "../setupFirebase"
import "../components/Habbits.css"

class Habbits extends React.Component {
  state = {
    userId: "",
    userHabbits: [],
  }
  getUserHabbits = userId => {
    getUserHabbits(userId).then(habbits =>{
      this.setState({ userHabbits: habbits })
    console.log(habbits)}
    )
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
 let color = undefined
 

    return isDone
  }
  handleClick = (e, cellId, habbitId) => {
    let isDone = e.target.classList.contains("done")
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

  render() {
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
    for (let i = -3; i < 4; i++) {
      let day = { date: new Date() }
      day.date.setDate(day.date.getDate() + i)
      day.date.setHours(0, 0, 0, 0)
      sevenDays.push(day)
    }

    return (
      <div>
        Habbitsaaaaaaaaaaaaaaaa
        <table>
          <thead>
            <tr>
              <th>Name</th>
              {sevenDays.map(day => (
                <th>
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
                      this.findHabbit(habbit, day)}
                  >
                    {day.date.getDate()} {monthNames[day.date.getMonth()]}
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
