require('dotenv').config()
const config = require('../config/config')
const app = require('./express')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
    useNewUrlParser:true,
    useFindAndModify:true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(()=>{
    console.log("Connect TO Database Successfully");
})
.catch(err=>{
    console.log("Can't Connect TO Database");
})

app.listen(config.port, err=>{
    if(err) console.log(err);
    console.log('server run at port', config.port);
})




