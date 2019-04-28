import React from "react"
import { getUserHabbits, addHabbit, deleteHabbit } from "../service/fetching"
import { auth, dbRef, db } from "../setupFirebase"

class MyHabbits extends React.Component {
  state = {
    userHabbits: [],
    newHabbit: "",
    userId: "",
    side: 'Positiv'
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

  handleChange = e => {
    this.setState({ newHabbit: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault()

    let id = Date.now()
    addHabbit(this.state.newHabbit, this.state.userId, id, this.state.side).then(() =>
      this.getUserHabbits(this.state.userId)
    )
  }
  handleDelete = habbitId => {
   
    deleteHabbit(this.state.userId, habbitId).then(() =>
      this.getUserHabbits(this.state.userId)
    )
  }
  selectChange = (e) =>{
    
    this.setState({side: e.target.value})
  }


  render() {
    let userId = this.props.state.currentUserData.id
    let userHabbits = this.props.state.userHabbits
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate() ;
    var year = dateObj.getUTCFullYear();
    
    var newdate = year + "/" + month + "/" + day;
    return (
      <div>
        <form action="">
        <select onChange={this.selectChange}>
  <option value="Positiv">Positiv</option>
  <option value="Negativ">Negativ</option>
  
</select>
          <input onChange={this.handleChange} type="text" />
          <button onClick={e => this.handleSubmit(e)}>Add</button>
        </form>
        {this.state.userHabbits.map(x => (
          <li key={x.id}>
            {x.name}{" "}
            <button onClick={() => this.handleDelete(x.id)}>Delete</button>
          </li>
        ))}

       
      </div>
    )
  }
}

export default MyHabbits
