const mongoose = require("mongoose")

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URI_LOCAL)
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB