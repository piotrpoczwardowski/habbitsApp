import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import {auth, dbRef, db} from '../setupFirebase'
import Login from '../components/Login'


class index extends React.Component {
  
  state = {
    
  }
 
 
componentDidMount(){
  
  // fetch("https://obshab.firebaseio.com/test.json")
  // .then(resp => resp.json())
  // .then(x => this.setState({words: Object.values(x) }));
 
  // console.log(this.state)
  auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      
      console.log(firebaseUser)
      
     
    } else {
      console.log("no-user");
      this.setState({ user: null, userData: {} });
    }
  });
}
logout = () => {
  auth.signOut()
 

  
}
  

  render() {
    
    return  (

      <div>
        <button onClick={this.logout}>Logout</button>
     <Login/>
      
      </div>
    )
  }
}

export default index