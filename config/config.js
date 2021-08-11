const config = {
    mongoUri: process.env.MONGO_URI,
    port: process.env.PORT || '3000',
    jwtSecret: process.env.JWT_SECRET
}
module.exports = config;