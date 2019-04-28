
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


  render() {
    let now = this.state.now
    let day = now.getDate();
    let month = now.getMonth();
    let year = now.getFullYear();
    const monthNames = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
    const days = ['Nie','Pon', 'Wto', 'Śro', 'Czw', 'Pią', 'Sob'];
    const daysInMonth = new Date(year, month+1, 0).getDate();
  const tempDate = new Date(year,month, 1);
  let firstMonthDay = tempDate.getDay();
 

let rowsNumber = Math.ceil(daysInMonth / 7)
let dateCellI = 1
let rowsArray = []
let addEmptyCells = false
for(let i = 0; i<rowsNumber; i++){
  
  
  
  let cellArray = []
  for(let j=0; j<7; j++){
    if(dateCellI-1 === daysInMonth){
      break;
    }
    if(firstMonthDay !==1 && !addEmptyCells){
      for(let x =0; x<firstMonthDay; x++){
        let emptyCell = ''
        cellArray.push(emptyCell)
        j=firstMonthDay-1
      }
      addEmptyCells = true
    } else{
      let date = new Date(year,month, dateCellI)
    let cel = date
    cellArray.push(cel)
    dateCellI++

    }
    
  }
  rowsArray.push(cellArray)
}

    return <div>
{console.log(rowsArray)}
    Calendar
    <div className="calendar">
<div className="date__name">
<button onClick={this.changeYear}>Prev</button>
<span>{monthNames[month]} {year}</span>
<button onClick={this.changeYear}>Next</button>
</div>
<div className="calendar__contener">
<table>
  <tr>{days.map(x => <th>{x}</th> )}</tr>
 
  <tbody>
  {rowsArray.map(x=> <tr>{x.map(y => <td>{y? y.getDate() : ' '}</td>)}</tr> )}


  </tbody>
</table>
</div>
</div>

    </div>
  }
}

export default Calendar
