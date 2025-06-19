import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Book-Nook",
  password: "OmgADatabase",
  port: 5432,
});
db.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  console.log("You're on the homepage.");
  res.render("index.ejs");
  console.log(await db.query("SELECT * FROM test"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
