import React from 'react'
import NavBar from './NavBar'

const HomePage = () => {
  return (
    <div className='home-page'>
      <NavBar></NavBar>
      <div className="bg-circle"/>
      <div className="landing-page">
        <h1>Welcome to AnotaCat!</h1>
        <br />
        <p>The Open Source Online Notepad</p>
        
        <div className="get-started">
          <h2>Get Started</h2>
          <div className="homepage-buttons">
            <a className="homepage-button" href='/login'>Login</a>
            <a className="homepage-button" href='/register'>Register</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage