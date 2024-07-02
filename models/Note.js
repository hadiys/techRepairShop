const mongoose = require("mongoose")
const AutoIncrement = require("mongoose-sequence")(mongoose)

const noteSchema = new mongoose.Schema(
    {   
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        title: {
            type: String,
            required: true 
        },
        text: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false 
        }
    },
    {
        timestamps: true
    }
)

noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500
})
module.exports = mongoose.model("Note", noteSchema)


// //
// type: mongoose.Schema.Types.ObjectId: Indicates that the "user" field is expected to store MongoDB ObjectIds. ObjectIds are typically used to uniquely identify documents in MongoDB.

// required: true: Specifies that a value for the "user" field is mandatory when creating or updating a document. The field must not be null or undefined.

// ref: "User": Establishes a reference to another Mongoose model named "User." This reference is useful for populating the "user" field with actual user documents from the "User" model.