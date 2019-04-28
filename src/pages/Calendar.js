
import React from "react"

import './Calendar.css'
class Calendar extends React.Component {
  state = {
    now: new Date()

  }
  componentWillMount(){
    this.setState({now: new Date()})
  }
changeYear = (e) => {
  
  let i = 0
  if(e.target.innerHTML === 'Prev'){
    i=-1
  }
  if(e.target.innerHTML === 'Next'){
    i=1
  }
  console.log(i)
let now = this.state.now


now.setMonth(now.getMonth()+ i)
this.setState({now: now})
}

handleClick = (e, date) => {
  this.toggleDone()
}
toggleDone = () => {
  
  fetch(`https://obshab.firebaseio.com/uzers/hgh.json`, {
    method: "PUT",
    body: JSON.stringify({
      lol: 'dsa'
      
    }),
    
  })
}


  render() {
    let now = this.state.now
    let day = now.getDate();
    let month = now.getMonth();
    let year = now.getFullYear();
    const monthNames = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
    const days = ['Pon', 'Wto', 'Śro', 'Czw', 'Pią', 'Sob','Nie'];
    const daysInMonth = new Date(year, month+1, 0).getDate();
  const tempDate = new Date(year,month, 1);
  let firstMonthDay = tempDate.getDay();
  if (firstMonthDay === 0) {
    firstMonthDay = 7;
}
const j = daysInMonth + firstMonthDay - 1;
let allCells = []
let dateCellsI = 1
for(let i = 0; i<j; i++){
  let cell 
  if(i<firstMonthDay-1){
    cell= ''
  } else{
    cell = new Date(year,month, (dateCellsI));
    dateCellsI++
  }
  
  
  allCells.push(cell)
}
let chunkArray = []
let chunk = 7
for(let i=0; i<allCells.length; i+=chunk){
  let part = allCells.slice(i, i+chunk)
  chunkArray.push(part)
}




    return <div>
{console.log(chunkArray)}
    Calendar
   
    <div className="calendar">
<div className="date__name">
<button onClick={this.changeYear}>Prev</button>
<span>{monthNames[month]} {year}</span>
<button onClick={this.changeYear}>Next</button>
</div>
<div className="calendar__contener">
<table>
  <thead>
  <tr>{days.map(x => <th>{x}</th> )}</tr>
  </thead>
  <tbody>
  {chunkArray.map(chunk => <tr>{chunk.map(cell => <td  onClick={(e) => this.handleClick(e,cell)}>{cell&& cell.getDate()}</td>)}</tr>)}
  </tbody>
</table>
</div>
</div>

    </div>
  }
}

export default Calendar
