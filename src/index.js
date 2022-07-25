const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
const route = require('./routes');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

//WebSocket
const server = require('http').createServer(app);
const WebSocketServer = require('ws');
const wss = new WebSocketServer.Server({ server: server });

var name;

wss.on('connection', function connection(ws) {
    ws.on('message', function message(message) {

        message = JSON.parse(message);

        if(message.type == "name"){
            ws.personName = message.data;
            return;
        }

        console.log('received: %s', message);
        wss.clients.forEach(function each(client) {
            if (client != ws ) {
                client.send(JSON.stringify({
                    type: ws.personName,
                    data: message.data
                }));
            }
        });
    });
});
//WebSocket end

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resource/views'));

route(app);

// app.listen(port, () => {
//     console.log(`App listening on port ${port}`);
// });

server.listen(3000, () => console.log('listening on port: 3000'));
