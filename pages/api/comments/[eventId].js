import {
  connectDabases,
  insertDocument,
  getAllDocuments
} from "@/helpers/db-utils"

export default async function handler(req, res) {
  const eventId = req.query.eventId

  if (req.method === "POST") {
    let client = null
    try {
      client = connectDabases()
    } catch (err) {
      return res.status(500).json({ message: "Error connecting to database" })
    }

    const { email, name, comment } = req.body
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !comment ||
      comment.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." })
      return
    }

    const newComment = {
      eventId: eventId,
      email: email,
      name: name.trim(),
      comment: comment.trim()
    }

    try {
      const result = insertDocument(client, "comments", newComment)
      newComment._id = result.insertedId
    } catch (err) {
      return res.status(500).json({ message: "Error inserting document" })
    } finally {
      if (client) await client.close()
    }

    res.status(201).json({ message: "Added comment.", comment: newComment })
  }

  if (req.method === "GET") {
    let client = null
    try {
      client = connectDabases()
    } catch (err) {
      return res.status(500).json({ message: "Error connecting to database" })
    }

    try {
      const comments = await getAllDocuments(client, "comments", {
        _id: -1
      })

      res.status(200).json({ comments: comments })
    } catch (err) {
      return res.status(500).json({ message: "Error query documents" })
    } finally {
      await client.close()
    }
  }
  res.status(200).json({ comments: [] })
}
