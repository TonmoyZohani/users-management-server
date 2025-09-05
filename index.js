const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com" },
  { id: 2, name: "Bob Smith", email: "bob.smith@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie.brown@example.com" },
];

app.get("/", (req, res) => {
  res.send(`Users management server is running`);
});

app.get("/users", (req, res) => {
  console.log("Users", users);
  res.send(users);
});

app.post("/users", (req, res) => {
  console.log(`Post Api is being hit`);
  console.log(req.body);
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  res.send(newUser);
});

app.listen(port, () => {
  console.log(`Server is running port ${port}`);
});
