
import React from "react"

import './Calendar.css'
class Calendar extends React.Component {
  state = {}

  render() {
    let now = new Date();
    let day = now.getDate();
    let month = now.getMonth();
    let year = now.getFullYear();
    const monthNames = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
    const days = ['Pon', 'Wto', 'Śro', 'Czw', 'Pią', 'Sob', 'Nie'];
    const daysInMonth = new Date(year, month+1, 0).getDate();
  const tempDate = new Date(year,month, 1);
  let firstMonthDay = tempDate.getDay();
  if (firstMonthDay === 0) {
    firstMonthDay = 7;
}
const j = daysInMonth + firstMonthDay - 1;


    return <div>

    Calendar
    <div className="calendar">
<div className="date__name">
<button>Prev</button>
<span>{monthNames[month]} {year}</span>
<button>Next</button>
</div>
<div className="calendar__contener">
<table>
  <tr>{days.map(x => <th>{x}</th> )}</tr>
  {console.log(now.getDay())}
  <tbody>
  {firstMonthDay-1 !== 0 && <tr></tr>}


  </tbody>
</table>
</div>
</div>

    </div>
  }
}

export default Calendar
