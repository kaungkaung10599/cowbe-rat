const net = require('net')

const host = 'localhost'
const port = 8000

// Create and return a net.Server object, the function will be invoked when client connect to this server.
const server = net.createServer()

// Make the server a TCP server listening on port 9999.
server.listen({host,port}, function () {

    const serverInfo = server.address()

    console.log(`TCP server is listening on : ${serverInfo.address}:${serverInfo.port}`)

    server.on('close', function () {
        console.log('TCP server socket is closed.')
    })

    server.on('error', function (error) {
        console.error(JSON.stringify(error))
    })

})

const connectedClients = []

server.on('connection', (client) => {

	connectedClients.push(client)

    console.log(`Local Address : ${client.localAddress}:${client.localPort}`)
    console.log(`Remote Address : ${client.remoteAddress}:${client.remotePort}`)
    console.log('Connected!')

    client.setEncoding('utf-8')

    var logged_in = false
    
    client.on('data', (data) => {
        data = data.replace(/(\r\n|\n|\r)/gm,"")
        
        console.log(`${client.remoteAddress}:${client.remotePort} : ${data}`)

        var arg = data.split(' ')

        if(arg[0] === 'login' && arg[1] === 'kaung'){
        	console.log(`${client.remoteAddress}:${client.remotePort} : just logged in`)
	    	logged_in = true
	    }

        if(logged_in){
		    switch(arg[0]){
		    	case 'list':
		    		var msg = ''
			    	for (var i = 0; i < connectedClients.length ; i++) {
			    		msg += JSON.stringify(connectedClients[i]._peername) + ' writable: ' + connectedClients[i].writable + '\n'
			    	}
			    	client.write(msg)
			    	break
			    case 'send':
			    	var msg = ''
			    	for (var i = 2; i < arg.length; i++) {
			    		msg += arg[i] + ' '
			    	}
			    	var index = parseInt(arg[1])
			    	if(index < connectedClients.length ){
                        if(connectedClients[index].writable){
			    		   connectedClients[index].write(msg)
                        }
                        else{
                            client.write('Cannot send! This socket has been closed.')
                        }
			    	}
			    	break
                case 'show':
                     console.log(connectedClients[arg[1]])
                     break
		    }
		}
		else {
			client.write('Please Login!')
		}


    })

    client.on('end', () => {
        console.log('Client disconnect.')
        server.getConnections(function (err, count) {
            if(!err)
            {
                console.log("There are %d connections now. ", count)
            }else
            {
                console.error(JSON.stringify(err))
            }

        })
    })

    // When client timeout.
    client.on('timeout', function () {
        console.log('Client request time out. ')
        client.end()
    })

 })

// const standard_input = process.stdin

// standard_input.setEncoding('utf-8')

// standard_input.on('data', function (data) {

//     if(data === 'exit\n'){
//         process.exit()
//     }else
//     {  
//     	var argv = data.split(' ')

//     	if(argv.length > 1){
//     		var index = parseInt(argv[0])
//     		if(connectedClients.length > index){
//     			console.log('Sending to ' + connectedClients[index]._peername)

//     			connectedClients[index].write(data)
//     		}
//     	}
//     }
// })