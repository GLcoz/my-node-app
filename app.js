const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('ENSI in the Cloud');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
