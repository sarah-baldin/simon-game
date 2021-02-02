const express = require('express');
const app = express();
const port = process.env.PORT || 8081;

app.use(express.static("public"));

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Simon Game listening at ${port}`);
});

