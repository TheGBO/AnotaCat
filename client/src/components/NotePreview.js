import React from 'react'

export const NotePreview = (props) => {
  return (
    <div className='note-preview'>
        <div className='ntp-wrp'>
            <h1 className='ntp-title'>{props.title}</h1>
            <p className='ntp-desc'>{props.description}</p>
        </div>
    </div>
  )
}
