import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { auth, dbRef, db } from "../setupFirebase"
import Login from "../components/Login"
import { navigate } from "gatsby"
import './index.scss'
import AniLink from "gatsby-plugin-transition-link/AniLink";
import TransitionLink from 'gatsby-plugin-transition-link'
import styled from "styled-components"
import {Section} from '../styles/style'


const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`

class index extends React.Component {
  componentDidMount() {
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.navigateWhenUser()
      } else {
      }
    })
  }

  navigateWhenUser = () => {
    navigate("/main/")
  }

  

  render() {
    
    return (
      <Section>
       
        <Login />
       
      </Section>
    )
  }
}

export default index
