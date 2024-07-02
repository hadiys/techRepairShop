const User = require("../models/User")
const Note = require("../models/Note")
const asyncHandler = require("express-async-handler")

// @desc Get all notes
// @route GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
    
    // const { id } = req.body
    
    // if(!id) {
    //     return res.status(400).json({"message": "Invalid or no ID provided"})
    // }

    // const user = await User.findById(id)

    // Handle error if user not found
    // if(!user) {
    //     return res.status(400).json({ "message": "User not found" })
    // }

    // const role = user.roles[0]

    // // Check permission before retrieving notes. Perform operation if role is either Admin or Manager 
    // if((role !== "Admin") == (role !== "Manager")) {
    //     return res.status(400).json({"message": "No permission"})
    // }

    const notes = await Note.find()

    if(!notes?.length){
        return res.status(400).json({ "message": "No notes found" })
    }

    res.json(notes)
})

// @desc Create a note
// @route POST /notes
// @access Private
const createNewNote = asyncHandler(async (req, res) => {
   // Login user if not logged in. Anyone can create a note when logged in
   
    const { id, title, text } = req.body

    const user = await User.findById(id)

    // All fields required when creating a note
    if (!user || !title || !text) {
        return res.status(400).json({message: "All fields are required" })
    }

    // When a note is created it is assigned to a user
    const noteObject = { user, title, text }

    const note = await Note.create(noteObject)

    if(note) {
        return res.status(201).json({ "message": "New note created" })
    } else {
        return res.status(400).json({ "message": `Invalid note data received` })
    }
})

// @desc Update a note
// @route PATCH /notes
// @access Private
const updateNote = asyncHandler(async (req, res) => {
   // Login user if not logged in

   // Admin | Manager can edit any note. Employee can edit assigned notes
    const { noteID, title, text, completed } = req.body

    // Check that the correct ID is provided
    if(!noteID) {
        return res.status(400).json({"message": "Invalid or no ID provided"})
    }

    const note = await Note.findById(noteID)
    
    if(!note){
        return res.status(400).json({"message": "Note not found"})
    }
    
    // Update Title, Text, and Completed if they have changed. 
    if(title) {
        note.title = title
    }

    if(text){
        note.text = text
    }

    if(completed) {
        note.completed = completed
    }

    const updatedNote = await note.save()

    res.json({"message": `Note with ID: ${updatedNote._id} has been updated`})
})

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
   // Login user if not logged in

   // Only Admin | Manager can delete a note
    const { id, noteID } = req.body

    if(!id || !noteID) {
        return res.status(400).json({"message": "All fields are required"})
    }

    const user = await User.findOne({ _id: id })

    if(!user){
        return res.status(400).json({"message": "User not found"})
    }

    role = user.roles[0]

    if((role !== "Admin") == (role !== "Manager")){
        return res.status(400).json({"message": "No permission"})
    }

    const note = await Note.findOne({ _id: noteID })

    if(!note) {
        return res.status(400).json({"message": "Note not found"})
    }

    const result = await note.deleteOne()

    res.json({ "message": `Note ${note._id} deleted` })
})

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}
