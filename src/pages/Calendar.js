import React from "react"
import { getUserHabbits, addHabbit, deleteHabbit } from "../service/fetching"
import "./Calendar.css"
class Calendar extends React.Component {
  state = {
    now: new Date(),
    userId: "",
    habbit: {}
    
  }
  componentWillMount() {
    let props = this.props.location.state
    this.setState({userId: props.userId,
    habbit: props.habbit})
   
  }
  getHabbit = () => {
    fetch(`https://obshab.firebaseio.com/users/${this.state.userId}/habbits/${this.state.habbit.id}.json`)
  .then(response => response.json())
  .then(userHabbits => userHabbits).then(x => {
    x.id = this.state.habbit.id
    console.log(x)
    this.setState({habbit:x})
  })
  }
 
  changeYear = e => {
    let i = 0
    if (e.target.innerHTML === "Prev") {
      i = -1
    }
    if (e.target.innerHTML === "Next") {
      i = 1
    }

    let now = this.state.now

    now.setMonth(now.getMonth() + i)
    this.setState({ now: now })
    console.log(this.state)
  }

  handleClick = (e, cellId) => {
    
    this.toggleDone(this.state.userId, this.state.habbit.id, cellId)
    .then(()=> this.getHabbit())
  }
  toggleDone = (userId, habbitId, cellId) =>
  
    fetch(
      `https://obshab.firebaseio.com/users/${userId}/habbits/${habbitId}/date/${cellId}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          
          isDone: true,
        }),
      }
    )

  render() {
    let now = this.state.now
    let day = now.getDate()
    let month = now.getMonth()
    let year = now.getFullYear()
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
    const days = ["Pon", "Wto", "Śro", "Czw", "Pią", "Sob", "Nie"]
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const tempDate = new Date(year, month, 1)
    let firstMonthDay = tempDate.getDay()
    if (firstMonthDay === 0) {
      firstMonthDay = 7
    }
    const j = daysInMonth + firstMonthDay - 1
    let allCells = []
    let dateCellsI = 1
    
    for (let i = 0; i < j; i++) {
      let cell
      if (i < firstMonthDay - 1) {
        cell = ""
      } else {
        cell = {date: new Date(year, month, dateCellsI)}

        
          
        dateCellsI++
      }

      allCells.push(cell)
    }
    let chunkArray = []
    let chunk = 7
    for (let i = 0; i < allCells.length; i += chunk) {
      let part = allCells.slice(i, i + chunk)
      chunkArray.push(part)
    }
    let habbitDate =  Object.entries(this.state.habbit.date || {}).map(([id, isDone])=> ({
      id,
      ...isDone
    }))
   

    return (
      <div>
        <button onClick={() =>this.getHabbit()}>CLICK</button>
        <div className="calendar">
          <h1>Calendar</h1>
       {this.state.habbit.name}
       {console.log(habbitDate)}
          <div className="date__name">
            <button onClick={this.changeYear}>Prev</button>
            <span>
              {monthNames[month]} {year}
            </span>
            <button onClick={this.changeYear}>Next</button>
          </div>
          <div className="calendar__contener">
            <table>
              <thead>
                <tr>
                  {days.map(x => (
                    <th>{x}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chunkArray.map(chunk => (
                  <tr>
                    {chunk.map(cell => (
                      <td onClick={e => this.handleClick(e, cell.date)}
                     className={habbitDate.some(habbit => habbit.id === `${cell.date}`)?'active': undefined}
                      >
                        {cell && cell.date.getDate()}
                    
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Calendar
