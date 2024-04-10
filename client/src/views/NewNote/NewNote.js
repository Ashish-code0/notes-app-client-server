import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import './NewNote.css';
import toast from 'react-hot-toast';
import {Link} from 'react-router-dom'

function NewNote() {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');

  const addNote = async () => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/notes`, {
      title: title,
      note : note,
      date : date
    });

    toast.success(response.data.message)
  }

  return (
    <div>
        <h1> New Note </h1>
        <form className='form-body'>
          <input type='text' className='title-input' value={title} placeholder='Enter Title' onChange={
            (e) => {
            setTitle(e.target.value)
          }}/>
          <textarea className='note-input' value={note} onChange={(e) => {
            setNote(e.target.value)
          }}>
          
          </textarea> 
          <input type='text' className='date-input' value={date} placeholder='Enter Date' onChange={(e) => {
            setDate(e.target.value);
            console.log({date})
          }}/>

          <button type='button' className='add-note-btn' onClick={addNote}>
            Add Note
          </button>
        </form>

        <button type='button' className='btn-to-home'>
            <Link  to='/' className='link-to-home'> See All Notes </Link>
        </button>
    </div>
  )
}

export default NewNote