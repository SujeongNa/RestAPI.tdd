//node start script
var express = require('express');//web framework 
var logger = require('morgan');//server log  
var bodyParser = require('body-parser');// body-parser
var user = require('./api/user/index.js'); //require module 

app = express();

if(process.env.NODE_ENV !=='test'){
    app.use(logger('dev')); //enable server logger in test environment
}

//middleware
app.use(bodyParser.json()) // parsing application/json
app.use('/users', user);//user module will work for /users APIs mehtods




// app.listen(3000, ()=>{ console.log('Server is running...')});

module.exports =app;  