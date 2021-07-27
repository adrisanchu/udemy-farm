const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.listen(3000, () => {
  console.log('APP IS LISTENING ON PORT 3000!');
});
