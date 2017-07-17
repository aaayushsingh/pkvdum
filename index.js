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
//var nodemailer=require('nodemailer');
//var aws = require('aws-sdk');

//The database essentials
//var mongodb=require('mongodb');
//var MongoClient=mongodb.MongoClient;
//var url='mongodb://user:pass@ds127962.mlab.com:27962/helfis';

// var insert=function(){}
// var ayush_insert=function(){}
// var findus=function(){}
// var air=function(){}

// MongoClient.connect(url,function(err,db){
// 	if(err)
// 	{
// 		console.log('Error connecting to the database');
// 		console.log(err);
// 	} else{
// 		console.log("This is supposed to be my db status");
// 		console.log('database connected');
// 		insert=function(data,callback){
// 			var collection=db.collection('developers');
// 			collection.insert(data,function(err1,result){
// 				if(err1){
// 					callback(err1);
// 				} else{
// 						callback(null,'success');
// 				}
// 			});
// 		}

// 		ayush_insert=function(ayushdata){
// 			var collection=db.collection('assessme_data');
// 			collection.insert(ayushdata,function(err2,result1){
// 				if(err2){
// 					console.log(err2);
// 					return 400;
// 				} else {
// 					console.log("Data Inserted successfully");
// 					return 200;

// 				}
// 			});

// 		}
// 	}
// });

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
	
	res.sendFile(__dirname+'/ls.html');
});



app.use(function(req, res) {
    res.status(404).send("lost?")
});

// function nu(des){
//     console.log(des);
// 	var bitch={
// 		"name": des.name,//"a boy has no name", 					//des.name,
// 		"email": des.email,//"kya karoge email ka",					//des.email,
// 		"phone": des.phone,//"call karoge kya?",					//des.phone,
// 		"weight": des.weight,//"bhut zada hai",						//des.weight,
// 		"height": des.height,//"kaafi hai",							//des.height,
// 		"BMR": des.BMR,//"ye konsi beemari hai?",					//des.BMR,
// 		"BMI": des.BMI,//"overweight hai be",						//des.BMI,
// 		"muscleMass": des.muscleMass,//"nahi hai muscles!",				//des.muscleMass,
// 		"bodyWater": des.bodyWater,//"ro-ro kar khatam hogaya",			//des.bodyWater,
// 		"boneMass": des.boneMass,//"khokli hain haddiyaan",			//des.boneMass,
// 		"visceralFat": des.visceralFat,//"bhut mota hai",					//des.visceralFat,
// 		"bodyFat": des.bodyFat//"motapa hi motapa"					//des.bodyFat
// 	};
// 	ayush_insert(bitch);
// 	return 200;
// }
