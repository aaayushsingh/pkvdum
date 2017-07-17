var express=require('express');
var app = express();
var bodyParser = require('body-parser');
var multer=require('multer');
var repl=require('replace-ext');
var random = require("node-random");
var request=require('request');
var favicon = require('serve-favicon');
var fs=require('fs');
var pack=require('./package.json');


var app=express();

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

var fs = require('fs');
var util = require('util');
var logFile = fs.createWriteStream('log.txt', { flags: 'a' });
// Or 'w' to truncate the file every time the process starts.
var logStdout = process.stdout;

// Process application/json
app.use(bodyParser.json());

//static files
app.use(express.static(__dirname+'/required/'));
app.set('port', (process.env.PORT || 8080));

app.listen(app.get('port'), function() {
    console.log('On port: ', app.get('port'))
});

app.get('/',function(req,res){
	console.log(req.method+" request received at "+req.url);
	
	res.sendFile(__dirname+'/index.html');
});



app.use(function(req, res) {
    res.status(404).send("lost?")
});

