var express  = require('express')
var app  = express()
var server = app.listen(8080, () => {
    console.log('Server is started on 8080')
})
app.get('/downloadFile/', (req, res) => {
  	filepath = req.query.filepath;
	res.download(filepath);
})
