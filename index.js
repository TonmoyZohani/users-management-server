const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());

const users = [
  { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com" },
  { id: 2, name: "Bob Smith", email: "bob.smith@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie.brown@example.com" },
];

app.get("/", (req, res) => {
  res.send(`Users management server is running`);
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", (req, res) => {
  console.log(`Post Api is being hit`);
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Server is running port ${port}`);
});
