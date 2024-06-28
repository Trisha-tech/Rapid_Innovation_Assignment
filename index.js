const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});