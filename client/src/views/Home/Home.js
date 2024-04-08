import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Home.css'; 

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
        {
            notes.map((notee, index) => {
                const {_id, title, note, date} = notee;
                
                return (
                <div>
                    <h3> { title }</h3>
                    <p> {note} </p>
                    <p> {date} </p>
                </div>)
            })
        }
    </div>
  )
}

export default Home