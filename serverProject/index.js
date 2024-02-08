const webSocketServer = require("websocket").server;
const http = require("http");

const WEBSOCKET_SERVER_PORT = 8000;

const server = http.createServer();
server.listen(WEBSOCKET_SERVER_PORT);
console.log("Listening on port 8000");

const wsServer = new webSocketServer({
    httpServer: server
})

const clients = {};

const initialCounters = { "1": 0, "2": 0, "3": 0, "4": 0 }

wsServer.on("request", function (request) {
    console.log(`Received new connection request from ${request.origin}`);

    const connection = request.accept(null, request.origin);

    clients[request.origin] = connection;

    for (user in clients) {
        clients[user].sendUTF(JSON.stringify(initialCounters));

        console.log("Message Sent to ", user)
    }

    connection.on("message", function (message) {
        if (message.type === "utf8") {
            console.log("Received message", message.utf8Data, typeof message.utf8Data);

            for (user in clients) {
                clients[user].sendUTF(message.utf8Data);

                console.log("Message Sent to ", user)
            }
        }
    })


})
