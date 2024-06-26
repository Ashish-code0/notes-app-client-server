import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Home.css'; 
import NoteCard from '../../components/NoteCard/NoteCard';
import {Link} from 'react-router-dom';

function Home() {
    const [notes, setNotes] = useState([]);
    const loadNotes = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes`);

        console.log(response.data.data)
        setNotes(response.data.data);
    }

    useEffect( () => {
        loadNotes();
    }, []);


  return (
    <div> 
        <h1>Home</h1>
        <div className='app-body'>
        
        {
            notes.map((notee, index) => {
                const {_id, title, note, date} = notee;
                
                return (<NoteCard key={_id} _id={_id} title={title} note={note} date={date} loadNotes={loadNotes}/>);

            }     
        )}

        </div>

        <button type='button' className='btn-to-newNote'>
            <Link  to='/new' className='link-to-newNote'> Add a Note </Link>
        </button>
        
  </div>
  )

}

export default Home