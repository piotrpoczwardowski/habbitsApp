import React from "react"

import { auth, dbRef, db } from "../setupFirebase"

class MyHabbits extends React.Component {
 



  render() {
   let habbits = this.props.currentUserData.habits
    return <div>
       <input type="text"/>
       <button>Hello</button>
       {Object.values(habbits).map(x => <p>{x}</p>)}
        
    </div>
  }
}

export default MyHabbits