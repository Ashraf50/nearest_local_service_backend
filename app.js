const express = require("express");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const appRouter = require("./routes/app_routes");
app.use("/", appRouter.router);
app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}`
  );
});
