var http = require("http")
var fs = require("fs")
var queryString = require("querystring")
var url = require("url")

var config = require('./config')

var MongoClient = require('mongodb').MongoClient

var DB = null

MongoClient.connect(config.mongodb, function(err, db) {
	DB = db
});

var handle = function (request, responds) {
	var _url = url.parse(request.url);
	var pathname = _url.pathname
	if(pathname==='/'){
		responds.end(fs.readFileSync('./public/index.html'));	
	}else if(pathname==='/submit'){
		var query = queryString.parse( _url.query );
        var obj = JSON.parse(query.data);
        var col = DB.collection('result')
        col.insertOne(obj, function(err, result) {
        	responds.end("ok")
  		});
	}else if(pathname==='/result'){
		responds.end("TO DO: Display")
	}else if(~pathname.indexOf('/img/')) {
		responds.end(fs.readFileSync('./public' + request.url));
	}
}

http.createServer(handle).listen("3000", function () {
	//console.log('listening :3000')
})
