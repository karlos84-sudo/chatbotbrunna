const http = require('http');

const port = process.env.PORT || 3978;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hola mundo Carlos\n');
});

server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
