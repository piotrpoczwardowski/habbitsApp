
import React from "react"

import { auth, dbRef, db } from "../setupFirebase"

class som extends React.Component {
  state = {}

  render() {
    return <div>dsad
      {console.log(this.props.location)}
    </div>
  }
}

export default som
