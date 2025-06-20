const express = require('express');
const path = require('path');
const app = express();

console.log('Serving static files from:', path.join(__dirname, '..'));
app.use(express.static(path.join(__dirname, '..')));

app.listen(4000, () => {
  console.log('Static test server running on http://localhost:4000');
});