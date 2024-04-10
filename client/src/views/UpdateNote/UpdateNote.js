import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './UpdateNote.css';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'

function UpdateNote() {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [date, setDate] = useState('');

    const {id} = useParams();

    const loadNote = async (id) => {
        if(!id){
            return
        } 

        console.log('creating response');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes/${id}`) 
        

        setTitle(response.data.data.title);

        setNote(response.data.data.note);

        setDate(response.data.data.date);
    };

    const updateNote = async () => {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/notes/${id}`, {
            title : title,
            note : note,
            date : date
        })

        toast.success(response.data.message);
        window.location.href = '/'
    }

    

    useEffect(() => {
        loadNote(id)
    }, [id])


    return (
        <div>
            <h1> Update Note </h1>

            <form className='form-body'>

                <input type='text' className='id-element' placeholder='Enter Title' value={id} disabled />


                <input type='text' className='title-input' placeholder='Enter Title' value={title} onChange={
                    (e) => {
                        setTitle(e.target.value)
                    }} />

                <textarea className='note-input' value={note} onChange={(e) => {
                    setNote(e.target.value)
                }}>
                </textarea>

                <input type='text' className='date-input' placeholder='Enter Date' value={date} onChange={(e) => {
                    setDate(e.target.value);
                    console.log({ date })
                }} />

                <button type='button' className='add-note-btn' onClick={updateNote}>
                    Update
                </button>
            </form>

            <button type='button' className='btn-to-home'>
                <Link to='/' className='link-to-home'> See All Notes </Link>
            </button>
        </div>
    )
}

export default UpdateNote