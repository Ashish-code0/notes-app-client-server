import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import './NewNote.css';
import toast from 'react-hot-toast';

function NewNote() {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState();

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
        <h1> NewNote </h1>
        <form className='form-body'>
          <input type='text'className='title-input' placeholder='Enter Title' onChange={
            (e) => {
            setTitle(e.target.value)
          }}/>
          <textarea className='note-input' onChange={(e) => {
            setNote(e.target.value)
          }}>
          
          </textarea> 
          <input type='text' className='date-input' placeholder='Enter Date' onChange={(e) => {
            setDate(e.target.value);
            console.log({date})
          }}/>

          <button type='button' className='add-note-btn' onClick={addNote}>
            Add Note
          </button>
        </form>
    </div>
  )
}

export default NewNote