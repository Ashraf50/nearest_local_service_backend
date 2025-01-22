const { MongoClient, ObjectId } = require("mongodb");
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@studenthub.amcyl.mongodb.net/?retryWrites=true&w=majority&appName=StudentHub`;
const client = new MongoClient(url);
const dbName = "services";

async function connectToDatabase() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
        console.log("Connected to MongoDB");
    }
}

async function getData(req, res) {
    const collectionName = req.query.collectionName;
    const documentId = req.query.documentId;
    if (!collectionName || !documentId) {
        return res.status(400).json({
            error: "collectionName and documentId are required",
        });
    }
    try {
        await connectToDatabase();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const data = await collection.findOne({ _id: new ObjectId(documentId) });
        if (!data) {
            return res.status(404).json({
                error: "Document not found",
            });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message,
        });
    }
}

module.exports = {
    getData,
};
