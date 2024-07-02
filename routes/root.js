const express = require("express")
const router = express.Router()
const path = require("path")

// Defines routes for HTTP methods. Router understands REGEXes
// path.join() will modify the current path when provided with '..'
router.get("^/$|/index(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"))
})

// module.exports can be assigned anyting that needs to be imported elsewhere in the project
// i.e: I can do const imported = require("./root")
// Relative path must be used in a require()
module.exports = router