const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

// mongoDB Connection
const uri = `mongodb+srv://job-portal-server:${process.env.DB_PASS}@cluster0.xu3a3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create collection
    const usersDatabase = client.db("job-portal").collection("users"); 

    //Post user data to MongoDB
    app.post("/users", async(req, res) => {
        const userInfo = req.body;
        console.log("User info")
        const result = await usersDatabase.insertOne(userInfo);
        res.send(result);
      });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Job Portal Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on PORT : ${port}`);
});
