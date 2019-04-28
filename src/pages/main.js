import React from "react"
import { navigate } from "gatsby"
import { auth, dbRef, db } from "../setupFirebase"
import MyHabbits from "../components/MyHabbits"
import Calendar from '../components/Calendar/Calendar'

class main extends React.Component {
  state = {
    user: {},
    allUsersData: {},
    currentUserData: {},
    isLoading: true,
    userHabbits: [],
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

  render() {
    return (
      <div>
        <button onClick={this.logout}>Logout</button>
        <button onClick={this.show}>show</button>
        <p>{this.state.user.email}</p>
        <p>{this.state.currentUserData.nick}</p>

        {this.state.isLoading ? (
          "load"
        ) : (
          <div>
            <MyHabbits state={this.state} />
          </div>
        )}

        <Calendar/>
      </div>
    )
  }
}

export default main
