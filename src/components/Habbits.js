
import React from "react"
import { getUserHabbits, addHabbit, deleteHabbit } from "../service/fetching"
import { auth, dbRef, db } from "../setupFirebase"
import { totalmem } from "os";

class Habbits extends React.Component {
  state = {
      userId: '',
      userHabbits: []
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

  render() {
      let now = new Date()
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
    for(let i = -3; i<4; i++){
        let day = new Date()
        day.setDate(day.getDate() + i)
        sevenDays.push(day)
    }
    return <div>

        Habbitsaaaaaaaaaaaaaaaa
        {this.state.userHabbits.map(habbit => (
          <li key={habbit.id}>
            {habbit.name}
            
          </li>
        ))}
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    {sevenDays.map(day => <th>{day.getDate()} {monthNames[day.getMonth()]}</th>)}
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
    </div>
  }
}

export default Habbits
