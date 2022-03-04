import React from 'react';
import { FaCat } from 'react-icons/fa';
import api from '../config';


const LoginPage = (props) => {
  function LoginOrRegister(){
    let dataform = {
      email: document.getElementById('email').value,
      pass: document.getElementById('pass').value
    }
    const authorize = () => {
      api.post('/login', dataform).then(res => {
        if(!res.data.success){
          alert("Authentication Failed");
        }else{
          localStorage.setItem("token",res.data.token);
          window.location.href = '/app';
        }
        console.log(res);
      });
    };
    if(props.type === "Login"){
      authorize();
    }
    if(props.type === "Register"){
      api.post('/user', dataform).then(res => {
        if(!res.data.success){
          alert("Registration Failed");
        }else{
          authorize();
        }
        console.log(res);
      });
    }
  }

  return (
    <div className='login-page'>
        <div className='login-form' id='login-form'>
            <h1 className='login-logo'>
                <FaCat/>
                AnotaCat
            </h1>
            <input type='email' placeholder='email' id='email' className='login-input'></input>
            <input type='password' placeholder='password' id='pass' className='login-input'></input>
            <button className='login-btn' onClick={() => {LoginOrRegister()}}>{props.type}</button>
        </div>
    </div>
  )
}

export default LoginPage