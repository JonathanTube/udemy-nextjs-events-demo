import { connectDabases, insertDocument } from "@/helpers/db-utils"

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email

    console.log("userEmail=", userEmail)

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" })
      return
    }

    let client = null

    try {
      client = connectDabases()
      await insertDocument(client, "emails", { email: userEmail })
    } catch (err) {
      return res.status(500).json({ message: "Error inserting document" })
    } finally {
      if (client) await client.close()
    }

    return res.status(201).json({ message: "Signed up successfully" })
  }
}
