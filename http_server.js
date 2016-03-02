var http = require('http')
var fs = require('fs')

http.createServer(function(req, res) {
	console.log(req.url)
	var url = req.url

	if (url === '/') {
		console.log(22)
		var html = fs.readFileSync('./public/index.html')
		res.end(html)
	}

	if (url === '/submit') {
		//  database..

		res.end('ok')
	}

	if (url === '/result') {
		var result = []
		result.push({
			loc: '222',
			openid: '123'
		})
		res.end(JSON.stringify(result))
	}

/*	if (url !== '/favicon.ico') {
		var file = fs.readFileSync('./public/' + url)
		res.end(file)
	}*/
	// res.end('hello tong !!!!!!!')
}).listen(3003)