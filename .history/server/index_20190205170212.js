var server = require('ws').Server;
var s = new server({port : 5001});

s.on('connection', function(ws){
    ws.on('message', function(message) {
        message = JSON.parse(message);
        if(message.type == "name"){
            ws.personName = message.data;
        }        
        console.log("Received " + message);
        s.clients.forEach(function e(client) {
            if(client != ws){

                client.send(message);
            }
        })
        //ws.send("From Server : ", message);
    });

    ws.on('close', function() {
        console.log('I lost a client');
    });
    
    //console.log('One more client connected');
})