var express  = require('express')
var app  = express()
var port = 8080
var server = app.listen(8080, () => {
    console.log('Server is started on ' + port)
})
app.get('/downloadFile/', (req, res) => {
  	filepath = req.query.filepath
	res.download(filepath)
})
