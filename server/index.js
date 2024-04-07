import express from 'express';
import dotenv from 'dotenv';
import  mongoose from 'mongoose';
import cors from 'cors';
dotenv.config();
import Note from './models/Note';


const app = express();
app.use(express.json());
app.use(cors());

//We are writing a function that will connect to the MongoDB database and print connection message in console
const connectDB = async () => {

    // "npm i dotenv" and create a ".env" file to create a environment variable and use it as a url for mongodb connection 
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected.");
}

connectDB();

const PORT = 5000;



app.get('/health', (req, res)=>{
    res.json({
        success : true,
        message: "Server is healthy",
        data : null
    })
});


/*
    'await' and 'async' is used because we may have to wait till the Note is created 
    create is a asynchronous process it will give a promise and move forward 
    But we want function to wait till a Note is created so use await
*/
app.post('/notes', async (req, res) => {
    const {title, note, date} = req.body;

    if(!title){
        return res.json({
            success : false,
            message : "Title is required.",
            data : null
        })
    }
    if(!note){
        return res.json({
            success : false,
            message : "Note is required.",
            data : null
        })
    }
    if(!date){
        return res.json({
            success : false,
            message : "Date is required.",
            data : null
        })
    }

   const newNote =  await Note.create({
        "title" : title,
        "note" : note,
        "date" : date
    })

    res.json({
        success : true,
        message : "Note added successfully.",
        data : newNote
    })
})

app.get('/notes', async (req, res) => {

    const notes = await Note.find();
    res.json({
        success : true,
        message : "Notes fetched successfully.",
        data : notes
    })
});

app.get('notes/:id', async (req, res) => {
    const {id} = req.params;  

    const note = Note.findById(id);
    //const note = Note.findOne({_id : id});   

    res.json({
        success : true,
        message : "Note fetched successfully",
        data : note
    })
});

app.put('/notes/:id', async (req, res) => {
    const {id} = req.params;
    const {title, note, date} = req.body;

    await Note.updateOne({_id: id} , {$set: 
        {
            title: title, 
            note: note,
            date: date
        }
    })

    res.json({
        success :true,
        message : "Note updated successfully",
        data : null
    })
})

app.delete('/notes/:id', async (req, res) => {
    const {id} = req.params;
    await Note.deleteOne({_id : id})

    res.json({
        success : true,
        message : "Note deleted successfully",
        data : null 
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})