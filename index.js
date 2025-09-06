const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

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

    // GET: fetch users
    app.get("/users", async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    });

    // GET: get a single user
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    // PUT: get a single user
    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const user = req.body;

      console.log("Id", id);
      console.log("User", user);

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updatedUser = {
        $set: {
          name: user.name,
          email: user.email,
        },
      };

      const result = await userCollection.updateOne(
        filter,
        updatedUser,
        options
      );
      res.send(result);
    });

    // POST: add user
    app.post("/users", async (req, res) => {
      try {
        const user = req.body;
        const result = await userCollection.insertOne(user);
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Failed to add user" });
      }
    });

    // POST: delete user
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    // Ping the DB
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running port ${port}`);
});
