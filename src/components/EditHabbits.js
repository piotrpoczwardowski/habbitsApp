import React from "react"
import { getUserHabbits, addHabbit, deleteHabbit } from "../service/fetching"
import { auth, dbRef, db } from "../setupFirebase"
import { Link } from "gatsby"
import Fade from "react-reveal/Fade"
class EditHabbits extends React.Component {
  state = {
    userHabbits: [],
    newHabbit: "",
    userId: "",
    isPositive: "true",
    component: "EditHabbits",
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
    addHabbit(
      this.state.newHabbit,
      this.state.userId,
      id,
      this.state.isPositive
    ).then(() => this.getUserHabbits(this.state.userId))
  }
  handleDelete = habbitId => {
    deleteHabbit(this.state.userId, habbitId).then(() =>
      this.getUserHabbits(this.state.userId)
    )
  }
  selectChange = e => {
    this.setState({ isPositive: e.target.value })
    console.log(e.target.value)
  }

  render() {
    let userId = this.props.state.currentUserData.id
    let userHabbits = this.props.state.userHabbits

    return (
      <div>
        <div className="editHabbits">
          <form action="">
            <select className="btn" onChange={this.selectChange}>
              <option value={true}>Positiv</option>
              <option value={false}>Negativ</option>
            </select>
            <input className="inp" onChange={this.handleChange} type="text" />
            <button className="btn" onClick={e => this.handleSubmit(e)}>
              Add
            </button>
          </form>
          <div className="editHabbits__list">
            {this.state.userHabbits.map(habbit => (
              <div className="habbit">
                <div className="habbit__name">{habbit.name}</div>
                <div className="habbit__calendar">
                  <button className="btn2"><Link state={{userId:this.state.userId,
                habbit: habbit }} to='/Calendar'> Calendar</Link></button>
                </div>
                <div className="habbit__delete">
                  <button
                    onClick={() => this.handleDelete(habbit.id)}
                    className="btn2"
                  >
                    X
                  </button>
                </div>
              </div>
              // <div className='habbit' key={habbit.id}>
              //  <p>{habbit.name}</p>
              //   <button className='btn btn-delete' onClick={() => this.handleDelete(habbit.id)}>X</button>
              //   <button className='btn'><Link state={{userId:this.state.userId,
              //   habbit: habbit }} to='/Calendar'> Calendar</Link></button>
              // </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default EditHabbits
