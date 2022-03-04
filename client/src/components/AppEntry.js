import React, { useEffect, useState } from 'react'
import { NotePreview } from './NotePreview.js'
import api from '../config';

export const AppEntry = () => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  };

  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    async function gud(){
      const resp = await api.get('/user',config);
      console.log(resp);
      setUserInfo(resp.data);
    }
    gud();
  }, []);

  return (
    <div className='app-entry-wrapper'>
      <div className='aew-notelist'>
        <NotePreview title="My Note" description="Note Description"></NotePreview>
      </div>
      <div className='aew-profile-info'>
        <div className='inner-profile-info'>
          <p className='email-display'>Email/User: {userInfo.user?.email}</p>
          <p className='email-display'>ID: {userInfo.user?.id}</p>
          
        </div>
        <div className='create-note-menu'>
          <button className='login-btn'>Create New Note</button>
        </div>
      </div>
    </div>
  )
}