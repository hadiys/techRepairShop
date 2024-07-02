const { logEvents } = require("./logger")

//Will override the default express error handler
const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, "errLog.log")
    
    console.log(err.stack)

    //Will check if the response has a status code, otherwise set it to 500 (server error)
    const status = res.statusCode ? res.statusCode : 500
    res.status(status)
    
    res.json({message: err.message})
}

module.exports = errorHandler