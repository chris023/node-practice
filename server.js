const http = require('http');

const url = require('url');

const server = http.createServer();

let messages = [
  {
    id: 1,
    user: 'a',
    message: 'aa',
  },
  {
    id: 2,
    user: 'b',
    message: 'bb',
  },
  {
    id: 3,
    user: 'c',
    message: 'cc',
  },
];

server.listen(3000, () => {
  console.log('The server is listening on port 3000');
});

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  }

  else if (request.method === 'POST') {
    let newMessage = { id: new Date() };

    request.on('data', (data) => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});

getAllMessages = (response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  messages.forEach((message) => {
    response.write(JSON.stringify(message) + '\n');
  });
  response.end();
}

addMessage = (newMessage, response) => {
  
  messages.push(newMessage);

  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write(JSON.stringify(newMessage));
  response.end();
}
