const express  = require("express");
const app = express();
const port = 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
 const cors = require("cors");





app.get("/", (req, res)=>{
    res.send("home page")
})
app.use(cors())
app.use(express.json())



// app.get('/phy_qus', (req, res)=>{
//     res.send("physics")
// })






//connect with mongodb database


const uri = 'mongodb+srv://Tashrif:tashrif55@cluster1.o8vqz8p.mongodb.net/crud?retryWrites=true&w=majority';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});




// insurt data
async function run() {




  // const database = client.db("physics1st");
  // const cullection = database.collection("1");



 // get api
  app.get('/:subject/:chapter', async (req, res)=>{
        const chapter = req.params.chapter;
        const subject = req.params.subject
        const database = client.db(subject);
        const cullection = database.collection(chapter);
        const cursor = cullection.find({});
        const questions = await cursor.toArray()
        res.send(questions)
       
   })

  // physics post
    try {
     
      app.post("/phy_qus", async(req, res)=>{
        console.log("called");
        // console.log(req.body);
        const doc = req.body
        console.log(doc);
        const database = client.db(`${doc.paper}`);
        const chapter = database.collection(`${doc.chapter}`);
        const result = await chapter.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);



      app.get('/phy_qus', (req, res)=>{
        res.send(doc)
    })


       
    })
      
    } finally {
    //   await client.close();
    }


    

      // Math post

    try {
      // const database = client.db("math1st");
      // const chapter1 = database.collection("chapter1");
      // create a document to insert
      app.post("/math_qus", async(req, res)=>{
        console.log("called");
        // console.log(req.body);
        const doc = req.body
        console.log(doc);
        const database = client.db(`${doc.paper}`);
        const chapter = database.collection(`${doc.chapter}`);
        const result = await chapter.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    })
      
    } finally {
    //   await client.close();
    }












  }
  run().catch(console.dir);

  






















app.get('/phy_qus/:chapter', (req, res)=>{
    const chapter = parseInt(req.params.chapter)

    const selectedChapter = questions.find(qus => qus.chapter === chapter) || {}
    res.send(selectedChapter)

})


app.listen(port, ()=>{
    console.log("connected to node");
})