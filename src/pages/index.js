import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import {auth, dbRef, db} from '../setupFirebase'

class index extends React.Component {
  
  state = {
    email: 'lollll',
    password: '',
    words: []
  }
 
 
componentDidMount(){
  
  fetch("https://obshab.firebaseio.com/test.json")
  .then(resp => resp.json())
  .then(x => this.setState({words: Object.values(x) }));
 
  console.log(this.state)
}
 
  

  render() {
    
    return  (

      <div  className="SignIn">
     
       
      </div>
    )
  }
}

export default index