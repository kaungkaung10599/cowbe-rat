import socket

listenSocket = socket.socket()
Port = 8000
maxConnection = 10
IP = socket.gethostbyname(socket.gethostname())

listenSocket.bind(('',Port))

listenSocket.listen(maxConnection)
print("Server started at " + IP + " on port " + str(Port) )

(clientSocket, address )  = listenSocket.accept()
print("New connection made!")

running = True
while running:
    message = clientSocket.recv(1024).decode()
    print(message)
