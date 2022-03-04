import React, { useEffect, useState } from 'react'
import { NotePreview } from './NotePreview.js'
import api from '../config';

export const AppEntry = () => {
  
  function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
  }

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  };

  async function verifyToken(){
    const resp = await api.post('/verify', config);
    console.log("verifying token...");
    console.log(resp);
  }
  

  verifyToken();

  const [userInfo, setUserInfo] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function gud(){
      const resp = await api.get('/user',config);
      console.log(resp);
      setUserInfo(resp.data);
    }
    gud();
  }, []);

  async function getNotes(){

    const resp = await api.get('/note',config);
    console.log(resp.data);
    setNotes(resp.data);
  }

  useEffect(() => {
    
    getNotes();
  }, [])

  function postNote(){
    if(isEmptyOrSpaces(document.getElementById('content').value)) return;
    async function pn(){
      const resp = await api.post('/note', {content: document.getElementById('content').value}, config);
      console.log(resp);
      getNotes();
    }
    pn();
    document.getElementById('content').value = "";
  }

  

  return (
    <div className='app-entry-wrapper'>
      <div className='aew-notelist'>
        {
          notes.note?.map((val) => {
            return(
              <NotePreview description={val.content}></NotePreview>
            )
          })
        }
      </div>
      <div className='aew-profile-info'>
        <div className='inner-profile-info'>
          <p className='email-display'>Email/User: {userInfo.user?.email}</p>
          <p className='email-display'>ID: {userInfo.user?.id}</p>
          
        </div>
        <div className='create-note-menu'>
          <button className='login-btn' onClick={() => {
            postNote();
          }}>Create New Note</button>
          <textarea className='np-edit' id="content"></textarea>
        </div>
      </div>
    </div>
  )
}