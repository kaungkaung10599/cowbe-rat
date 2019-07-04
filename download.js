var express  = require('express')
var app  = express()
var server = app.listen(8080, () => {
    console.log('Server is started on 127.0.0.1:8081')
})
app.get('/downloadFile/', (req, res) => {
  res.download('./demo.pdf');
})