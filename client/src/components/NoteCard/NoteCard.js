import React from 'react';
import './NoteCard.css';
import DeleteIcon from './deleteIcon.png';
import toast from 'react-hot-toast';
import axios  from 'axios';

function NoteCard({_id, title, note, date, loadNotes}) {

  const deleteNote = async() => {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/notes/${_id}`);
    toast.success(response.data.message);
    loadNotes();
  }
   

  return (
    <div className='note-card'>
        <p className='note-card-title'> {title} </p>
        <p className='note-card-note'> {note} </p>
        <p className='note-card-date'> {date}</p>
        <img src={DeleteIcon} className='delete-icon' onClick={deleteNote}/>
    </div>
  )
}

export default NoteCard