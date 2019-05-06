import React from "react"
import { getUserHabbits, addHabbit, deleteHabbit } from "../service/fetching"
import { auth, dbRef, db } from "../setupFirebase"
import '../components/Habbits.css'

class Habbits extends React.Component {
  state = {
    userId: "",
    userHabbits: [],
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
  // findHabbit = (habbit, day) => {
  //   let habbitDate =  Object.entries(habbit.date || {}).map(([id, isDone])=> ({
  //     id,
  //     ...isDone
  //   }))
  //   console.log(habbitDate.some(habbit => habbit.id === `${day}`))
  // }
  

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
      let day = {date:new Date()}
      day.date.setDate(day.date.getDate() + i)
      sevenDays.push(day)
    }
    
    return (
      <div>
        Habbitsaaaaaaaaaaaaaaaa
        table
        {/* <table>
          <thead>
            <tr>
              <th>Name</th>
              {sevenDays.map(day => (
                <th>
                  {day.getDate()} {monthNames[day.getMonth()]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.userHabbits.map(habbit => (
              <tr key={habbit.id}>
                <td>{habbit.name}</td>
                {sevenDays.map(day => (
                  <td>
                     {this.findHabbit(habbit, day)}
                    {day.getDate()} {monthNames[day.getMonth()]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    )
  }
}

export default Habbits
