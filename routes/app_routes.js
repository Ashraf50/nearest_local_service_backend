const express = require("express");
const database = require("../db/db_manager");
const supeData = require("../supabase/fetch_data");
const middle = require("../middleware/api_key");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Welcome to..." });
});

router.get("/services", middle.apiKeyMiddleware, database.getData);

router.get("/api/services/", middle.apiKeyMiddleware, supeData.fetchData);

module.exports = {
    router,
};
