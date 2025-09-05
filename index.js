const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
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

const uri =
  "mongodb+srv://zohani0804:asem0804@cluster0.d9m08dj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const database = client.db("userDB");
    const userCollection = database.collection("users");

    // POST: add user
    app.post("/users", async (req, res) => {
      try {
        const user = req.body;
        console.log("User", user);
        const result = await userCollection.insertOne(user);
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Failed to add user" });
      }
    });

    // Ping the DB
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
}
run().catch(console.dir);

// app.get("/", (req, res) => {
//   res.send(`Users management server is running`);
// });

// app.get("/users", (req, res) => {
//   console.log("Users", users);
//   res.send(users);
// });

app.listen(port, () => {
  console.log(`Server is running port ${port}`);
});
