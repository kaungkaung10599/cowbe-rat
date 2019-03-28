import socket

listenSocket = socket.socket()

maxConnection = 10

IP = input("IP : ")
Port = (int)(input("Port: "))

listenSocket.bind((IP,Port))

listenSocket.listen(maxConnection)
print("Server started at " + IP + " on port " + str(Port) )

(clientSocket, address )  = listenSocket.accept()
print("New connection made!")

running = True
while running:
    message = clientSocket.recv(1024).decode()
    print(message)
