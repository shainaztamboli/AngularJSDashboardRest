/**
 * Created by shainazt on 2/3/2015.
 */
var db = require('./config/db')();
var app=require('./config/express')();

require('./config/routes.js')(app);

app.listen('3000');
console.log('Listening on port 3000');