import React from "react"
import { navigate } from "gatsby"
import { auth, dbRef, db } from "../setupFirebase"
import EditHabbits from "../components/EditHabbits"
import Habbits from '../components/Habbits'


class main extends React.Component {
  state = {
    user: {},
    allUsersData: {},
    currentUserData: {},
    isLoading: true,
    userHabbits: [],
    component: 'Habbits'
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
  changePage = (e) => {
    console.log(e.target.innerHTML)
    this.setState({component: e.target.innerHTML})
  }

  render() {
    let components = {
      'Habbits': <Habbits state={this.state}/>,
      'EditHabbits': <EditHabbits state={this.state}/>
    }
    return (
      <div>
        <button onClick={this.logout}>Logout</button>
       
        <p>{this.state.user.email}</p>
        <p>{this.state.currentUserData.nick}</p>
<div><span onClick={this.changePage}>Habbits</span> <span onClick={this.changePage}>EditHabbits</span></div>
        {this.state.isLoading ? (
          "load"
        ) : (
          <div>
           
           {components[this.state.component]}
          </div>
        )}

       
      </div>
    )
  }
}

export default main
