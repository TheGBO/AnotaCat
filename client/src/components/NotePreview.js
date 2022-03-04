import React from 'react'

export const NotePreview = (props) => {
  return (
    <div className='note-preview'>
        <div className='ntp-wrp'>
            <p className='ntp-desc'>{props.description}</p>
        </div>
    </div>
  )
}
