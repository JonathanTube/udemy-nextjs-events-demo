import { MongoClient, ServerApiVersion } from "mongodb"

export function connectDabases() {
  const uri =
    "mongodb+srv://Jonathan:1PkM2lc54jE9zt5g@demoforlearningnextjs.dbihb7w.mongodb.net/?retryWrites=true&w=majority&appName=DemoForLearningNextJS"
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  return new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  })
}

export async function insertDocument(client, collection, document) {
  await client.connect()
  const db = await client.db("nodeJsDemo")
  await db.collection(collection).insertOne(document)
}

export async function getAllDocuments(client, collection, sort) {
  console.log("Getting all documents")
  await client.connect()
  const db = await client.db("nodeJsDemo")
  return await db.collection(collection).find().sort(sort).toArray()
}
