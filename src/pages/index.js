import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import {auth, dbRef, db} from '../setupFirebase'
import Login from '../components/Login'
import {navigate} from 'gatsby'


class index extends React.Component {
  
  state = {
    user: false
  }
 
 
componentDidMount(){
  
  // fetch("https://obshab.firebaseio.com/test.json")
  // .then(resp => resp.json())
  // .then(x => this.setState({words: Object.values(x) }));
 
  // console.log(this.state)
  auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      
      
      this.setState({user:true})
      this.navigateWhenUser()
     
    } else {
      console.log("no-user");
     
    }
  });

  
}


navigateWhenUser = () =>{
  navigate('/main/')
}
  

  render() {
    
    return  (

      <div>
       
        {this.state.user? <p>ta</p> : <p>nope</p>}
     <Login/>
      
      </div>
    )
  }
}

export default index