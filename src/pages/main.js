import React from "react"
import { navigate } from "gatsby"
import { auth, dbRef, db } from "../setupFirebase"
import EditHabbits from "../components/EditHabbits"
import Habbits from "../components/Habbits"
import Fade from "react-reveal/Fade"
import Calendar from "../components/Calendar"
import Statistics from '../components/Statistics'

class main extends React.Component {
  state = {
    user: {},
    allUsersData: {},
    currentUserData: {},
    isLoading: true,
    userHabbits: [],
    component: "Statistics",
    propHabbit: "",
  }
  componentWillMount() {
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.setState({ user: firebaseUser })

        fetch("https://obshab.firebaseio.com/users.json")
          .then(resp => resp.json())
          .then(x =>
            Object.values(x).map(user => {
              if (user.email === firebaseUser.email) {
                this.setState({ currentUserData: user, isLoading: false })
              }
            })
          )
        // this.updateCurrentUser(firebaseUser)
      } else {
        console.log("no-user")
        navigate("/")
      }
    })
  }

  logout = () => {
    auth.signOut()
    navigate("/")
  }
  show = () => {
    console.log(Object.values(this.state.userHabbits).map(x => x.key))
  }
  changePage = (e, habbit) => {
    this.setState({ component: e.target.innerHTML, propHabbit: habbit })
  }

  render() {
    let components = {
      Habbits: (
        
          <Habbits state={this.state} />
       
      ),
      Statistics: (
        <Statistics state={this.state}/>
      ),
      EditHabbits: (
        <EditHabbits changePage={this.changePage} state={this.state} />
      ),
      Calendar: (
        <Calendar
          userId={this.state.currentUserData.id}
          habbit={this.state.propHabbit}
        />
      ),
    }
    return (
      <div className="main">
        <div className="navigation">
          <button className="btn btn__nav" onClick={this.changePage}>
            Habbits
          </button>
          <button className="btn btn__nav" onClick={this.changePage}>
            Statistics
          </button>
          <button className="btn btn__nav" onClick={this.changePage}>
            EditHabbits
          </button>
          <button className="btn btn__logout" onClick={this.logout}>
            Logout
          </button>
        </div>

        <p>{this.state.user.email}</p>

        {this.state.isLoading ? (
          "load"
        ) : (
          <div>{components[this.state.component]}</div>
        )}
      </div>
    )
  }
}

export default main
