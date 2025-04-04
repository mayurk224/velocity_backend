const mongoose = require("mongoose");

function connectToDb() {
  mongoose.connect(process.env.DB_URL);

  const db = mongoose.connection;

  db.on("connected", () => {
    console.log("Connected to the database");
  });

  db.on("error", (err) => {
    console.error("Database connection error:", err);
  });
}

module.exports = connectToDb;
