//CORS is a middleware used to only allow certain origins to request resources from our API
// allowedOrigins is a list of allowedOrigins which is passed as an corsOption to cors()

const allowedOrigins = [
    "http://localhost:3000",
    "https://www.dandrepairshop.com",
    "https://dandrepairshop.com"
]

module.exports = allowedOrigins