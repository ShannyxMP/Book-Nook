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

let books = [
  {
    id: 1, // SERIAL PRIMARY KEY
    title: "City of thieves", // VARCHAR(100)
    author: "David Benioff", //VARCHAR(100)
    book_cover: "https://covers.openlibrary.org/b/isbn/0452295297.jpg", // VARCHAR(255)
    isbn: "0452295297", // VARCHAR(15) UNIQUE NOT NULL, CHECK (char_length(ISBN) = 10 OR char_length(ISBN) = 13)
    ol_link: "https://openlibrary.org/isbn/0452295297", // VARCHAR(255)
  },
];

let reviews = [
  {
    id: 1, // SERIAL PRIMARY KEY
    rating: 4, // NOT NULL, CHECK (rating >= 0 AND rating <=5)
    review: "Featured in the The Last of Us Part II game. It was interesting.", // TEXT
    book_isbn: "0452295297", // VARCHAR(13)
    date_created: "2025-06-22", // DATE NOT NULL DEFAULT CURRENT_DATE
  },
];

app.get("/", async (req, res) => {
  console.log("You're on the homepage.");
  res.render("index.ejs");
  // console.log(await db.query("SELECT * FROM test"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
