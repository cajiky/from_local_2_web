// Requires Express - gives a function
const express = require('express');

//Create an instance of express by calling the function returned above - gives us an object
const app = express();


//express static file serving - public is the foler name
app.use( express.static('server/public'));
const port = 1337;
//start up our server
app.listen(port, function(){
    console.log('listening on port', port);
})
