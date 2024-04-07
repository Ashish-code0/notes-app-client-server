import   {model, Schema}  from 'mongoose';


//This noteSchema acts as a plan for the structure of our data 
//We only provide the field and their data types to make a Schema
const noteSchema = new Schema (
    {
        title : String,
        note : String,
        date : String
    }
)

const Note = model("Note", noteSchema);

export default Note;